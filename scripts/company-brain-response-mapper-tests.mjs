import test from "node:test"
import assert from "node:assert/strict"
import { mapCompanyBrainResponseBlocks } from "../lib/company-brain/response-mapper.ts"

test("top-level source metadata becomes visible without raw source IDs or client action reconstruction", () => {
  const blocks = mapCompanyBrainResponseBlocks({
    answer: "I found the customer and prepared the update.",
    proof_id: "public-proof",
    blocks: [{ type: "text", text: "I found the customer and prepared the update." }],
    source_chips: [{ connector: "jobber", record_type: "client", source_id: "internal-record-123", label: "Customer record", brief_source: "Jobber customer" }],
  })
  assert.deepEqual(blocks.map((block) => block.type), ["text", "sources"])
  assert.equal(JSON.stringify(blocks).includes("internal-record-123"), false)
})

test("runtime artifacts never synthesize client-side document bytes", () => {
  const [block] = mapCompanyBrainResponseBlocks({
    answer: "",
    blocks: [{ type: "artifact", artifact: { id: "artifact-1", title: "Report", kind: "spreadsheet", status: "ready", description: "Verified report", fileName: "report.xlsx", extension: "xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", downloadUrl: "/api/company-brain/artifacts/artifact-1" } }],
  })
  assert.equal(block.type, "artifact")
  assert.equal(block.artifact.downloadUrl, "/api/company-brain/artifacts/artifact-1")
  assert.equal("file" in block.artifact, false)
})

test("failed or invalid artifacts never expose a download URL", () => {
  for (const artifact of [
    { id: "failed", title: "Failed", kind: "pdf", status: "failed", description: "No file", fileName: "failed.pdf", extension: "pdf", mimeType: "application/pdf", downloadUrl: "/api/company-brain/artifacts/failed" },
    { id: "external", title: "External", kind: "pdf", status: "ready", description: "No file", fileName: "external.pdf", extension: "pdf", mimeType: "application/pdf", downloadUrl: "https://example.com/file.pdf" },
  ]) {
    const [block] = mapCompanyBrainResponseBlocks({ answer: "", blocks: [{ type: "artifact", artifact }] })
    assert.equal(block.type, "artifact")
    assert.equal(block.artifact.downloadUrl, undefined)
  }
})

test("ambiguous runtime failures do not claim no mutation occurred", () => {
  const blocks = mapCompanyBrainResponseBlocks({ answer: "", errorCode: "runtime_failed" })
  assert.equal(JSON.stringify(blocks).includes("Nothing was created or changed"), false)
  assert.equal(JSON.stringify(blocks).toLowerCase().includes("outcome"), true)
})
