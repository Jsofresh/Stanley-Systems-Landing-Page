import { join } from "node:path"
import {
  createManifest,
  git,
  main,
  redactRemote,
  requireOk,
  toBool,
  updateStatus,
  writeJson,
  writeManifest,
} from "./_lib.ts"

await main(async (args) => {
  const manifest = createManifest(args)
  const dryRun = toBool(args.dry_run, false)
  const allowDirtyCommit = toBool(process.env.DESIGN_LOOP_ALLOW_DIRTY_BACKUP_COMMIT, false)
  const branch = `design-loop/${manifest.run_id}`
  const tag = `pre-design-loop-${manifest.run_id}`

  const repo = git(["rev-parse", "--show-toplevel"])
  const status = git(["status", "--short", "--branch"])
  const head = git(["rev-parse", "HEAD"])
  const remote = git(["remote", "-v"])
  const remotes = redactRemote(remote.stdout)

  manifest.pre_run_commit = head.stdout.trim()
  manifest.branch = branch
  manifest.tag = tag
  manifest.backup = {
    repo: repo.stdout.trim(),
    status: status.stdout,
    remote: remotes,
    dry_run: dryRun,
    dirty_worktree: status.stdout
      .split(/\r?\n/)
      .some((line) => line.trim() && !line.startsWith("##")),
  }

  const reportPath = join(manifest.run_dir, "build-reports", "init-backup.json")

  if (repo.status !== 0 || head.status !== 0) {
    manifest.backup = { ...manifest.backup, status: "blocked", reason: "not_a_git_repo" }
    writeJson(reportPath, manifest.backup)
    updateStatus(manifest, "blocked_bridge_or_backup")
    return
  }

  if (!remote.stdout.includes("origin")) {
    manifest.backup = { ...manifest.backup, status: "blocked", reason: "missing_origin_remote" }
    writeJson(reportPath, manifest.backup)
    updateStatus(manifest, "blocked_bridge_or_backup")
    return
  }

  if (manifest.backup.dirty_worktree && !allowDirtyCommit) {
    manifest.backup = {
      ...manifest.backup,
      status: "blocked",
      reason: "dirty_worktree_without_backup_commit",
      required_action:
        "Commit or stash existing work, or set DESIGN_LOOP_ALLOW_DIRTY_BACKUP_COMMIT=true to create an explicit pre-run backup commit before the loop.",
    }
    writeJson(reportPath, manifest.backup)
    updateStatus(manifest, "blocked_bridge_or_backup")
    return
  }

  if (dryRun) {
    manifest.backup = {
      ...manifest.backup,
      status: "dry_run_ready",
      planned_commands: [
        `git tag ${tag} HEAD`,
        `git push origin ${tag}`,
        `git checkout -b ${branch}`,
        `git push -u origin ${branch}`,
      ],
    }
    writeJson(reportPath, manifest.backup)
    updateStatus(manifest, "backup_complete")
    return
  }

  if (manifest.backup.dirty_worktree && allowDirtyCommit) {
    requireOk(git(["add", "-A"]))
    requireOk(git(["commit", "-m", `design-loop pre-run backup ${manifest.run_id}`]))
    const newHead = git(["rev-parse", "HEAD"])
    requireOk(newHead)
    manifest.pre_run_commit = newHead.stdout.trim()
  }

  const tagResult = git(["tag", tag, "HEAD"])
  if (tagResult.status !== 0 && !tagResult.stderr.includes("already exists")) {
    manifest.backup = { ...manifest.backup, status: "blocked", failed_command: tagResult.command, stderr: tagResult.stderr }
    writeJson(reportPath, manifest.backup)
    updateStatus(manifest, "blocked_bridge_or_backup")
    return
  }

  const pushTag = git(["push", "origin", tag])
  if (pushTag.status !== 0) {
    manifest.backup = { ...manifest.backup, status: "blocked", failed_command: pushTag.command, stderr: pushTag.stderr }
    writeJson(reportPath, manifest.backup)
    updateStatus(manifest, "blocked_bridge_or_backup")
    return
  }

  const branchResult = git(["checkout", "-b", branch])
  if (branchResult.status !== 0 && !branchResult.stderr.includes("already exists")) {
    manifest.backup = { ...manifest.backup, status: "blocked", failed_command: branchResult.command, stderr: branchResult.stderr }
    writeJson(reportPath, manifest.backup)
    updateStatus(manifest, "blocked_bridge_or_backup")
    return
  }

  const pushBranch = git(["push", "-u", "origin", branch])
  if (pushBranch.status !== 0) {
    manifest.backup = { ...manifest.backup, status: "blocked", failed_command: pushBranch.command, stderr: pushBranch.stderr }
    writeJson(reportPath, manifest.backup)
    updateStatus(manifest, "blocked_bridge_or_backup")
    return
  }

  manifest.backup = { ...manifest.backup, status: "backup_complete", pushed_branch: branch, pushed_tag: tag }
  writeJson(reportPath, manifest.backup)
  writeManifest(manifest)
  updateStatus(manifest, "backup_complete")
})
