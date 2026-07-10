import { hashPortalPassword } from "../lib/portal/auth-credentials.ts"

async function readPassword() {
  if (!process.stdin.isTTY) {
    let input = ""
    for await (const chunk of process.stdin) input += chunk
    return input.replace(/[\r\n]+$/, "")
  }

  process.stderr.write("Password: ")
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.setEncoding("utf8")
  return await new Promise((resolve, reject) => {
    let password = ""
    const cleanup = () => {
      process.stdin.setRawMode(false)
      process.stdin.pause()
      process.stderr.write("\n")
    }
    process.stdin.on("data", function onData(chunk) {
      for (const character of chunk) {
        if (character === "\u0003") {
          process.stdin.off("data", onData)
          cleanup()
          reject(new Error("cancelled"))
          return
        }
        if (character === "\r" || character === "\n") {
          process.stdin.off("data", onData)
          cleanup()
          resolve(password)
          return
        }
        if (character === "\u007f") {
          password = password.slice(0, -1)
          continue
        }
        password += character
      }
    })
  })
}

try {
  const password = await readPassword()
  if (!password) throw new Error("password_required")
  process.stdout.write(`${hashPortalPassword(password)}\n`)
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : "credential_generation_failed"}\n`)
  process.exitCode = 1
}
