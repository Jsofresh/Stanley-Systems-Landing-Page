"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        if (response.status === 429) throw new Error("Too many sign-in attempts. Wait a few minutes and try again.")
        throw new Error("The email or password is incorrect.")
      }
      router.push("/portal")
      router.refresh()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <label htmlFor="portal-email" className="block">
        <span className="text-sm font-bold text-[#102033]">Email</span>
        <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-[#ded6c8] bg-white px-3">
          <Mail className="h-4 w-4 text-[#15803d]" />
          <input
            id="portal-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#102033] outline-none"
          />
        </span>
      </label>
      <label htmlFor="portal-password" className="block">
        <span className="text-sm font-bold text-[#102033]">Password</span>
        <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-[#ded6c8] bg-white px-3">
          <LockKeyhole className="h-4 w-4 text-[#15803d]" />
          <input
            id="portal-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#102033] outline-none"
          />
        </span>
      </label>
      {error ? <p role="alert" aria-live="assertive" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-lg bg-[#15803d] text-base font-bold text-white hover:bg-[#116832]"
      >
        {loading ? "Opening Company Brain" : "Sign in to Company Brain"}
        <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-xs leading-5 text-[#667085]">
        Your account determines which company records and office actions are available.
      </p>
    </form>
  )
}
