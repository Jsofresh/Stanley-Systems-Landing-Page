import { NextResponse } from 'next/server'
import { buildOpsLayerSnapshot } from '@/lib/stanley-demo/ops-layer'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const snapshot = await buildOpsLayerSnapshot()
  return NextResponse.json(snapshot)
}
