export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function proxy(request: Request, path: string) {
  const body = await request.text()

  try {
    const response = await fetch(`http://127.0.0.1:3041${path}`, {
      method: 'POST',
      headers: {
        'content-type': request.headers.get('content-type') || 'application/json',
      },
      body,
      cache: 'no-store',
    })

    const text = await response.text()
    return new Response(text, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') || 'application/json',
      },
    })
  } catch {
    return Response.json(
      {
        success: false,
        error: 'backend_unreachable',
        message: 'Phone assistant backend is unreachable',
      },
      { status: 502 },
    )
  }
}

export async function POST(request: Request) {
  return proxy(request, '/checkAvailability')
}
