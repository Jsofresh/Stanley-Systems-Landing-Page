import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
 const { searchParams } = new URL(request.url)
 const code = searchParams.get('code')
 const state = searchParams.get('state')
 const realmId = searchParams.get('realmId')

 console.log('QBO OAuth callback received:', { code, state, realmId })

 return NextResponse.json({
 status: 'ok',
 code,
 realmId
 })
}
