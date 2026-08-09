import { readFile } from "node:fs/promises"
import path from "node:path"

export const dynamic = "force-static"

export async function GET() {
  const pdfPath = path.join(process.cwd(), "public", "downloads", "ai-office-blueprint", "5-ai-office-workflows.pdf")
  const pdf = await readFile(pdfPath)

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="stanley-5-ai-office-workflows.pdf"',
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  })
}
