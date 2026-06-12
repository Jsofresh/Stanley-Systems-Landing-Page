import { sampleGeneratedBlueprint } from "@/lib/ai-office-blueprint/sample-data"
import { renderAiOfficeBlueprintPdfBuffer } from "@/lib/ai-office-blueprint/pdf-renderer"

export const dynamic = "force-dynamic"

export async function GET() {
  const pdf = await renderAiOfficeBlueprintPdfBuffer(sampleGeneratedBlueprint)

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="stanley-ai-office-blueprint-sample.pdf"',
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  })
}
