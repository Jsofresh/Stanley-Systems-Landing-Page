"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { LockKeyhole, ShieldCheck } from "lucide-react"

export default function RemotionLoginPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/remotion-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        setError("That access token did not work.")
        setLoading(false)
        return
      }

      router.push("/remotion")
      router.refresh()
    } catch {
      setError("Login failed. Try again in a moment.")
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f4] px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-[#d9e6d7] bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <div className="inline-flex items-center rounded-full border border-[#d9e6d7] bg-[#f2faf1] px-4 py-2 text-sm font-semibold text-[#166534]">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Private Stanley access
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">Unlock the Remotion editor</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          This page is meant for your private video-editing access. Enter your token and the site will open the protected Remotion workspace page.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-slate-900" htmlFor="token">
            Access token
          </label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="token"
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Enter your private token"
              className="h-12 w-full rounded-2xl border border-[#d8d1c4] bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400"
              autoComplete="current-password"
              required
            />
          </div>
          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Checking..." : "Open Remotion editor"}
          </button>
        </form>
      </div>
    </main>
  )
}
