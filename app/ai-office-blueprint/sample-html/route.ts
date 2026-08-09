import { NextResponse } from "next/server"
import { renderAiOfficeBlueprintHtml } from "@/lib/ai-office-blueprint/renderer"
import { sampleGeneratedBlueprint } from "@/lib/ai-office-blueprint/sample-data"

export function GET() {
  return new NextResponse(renderAiOfficeBlueprintHtml(sampleGeneratedBlueprint), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  })
}
