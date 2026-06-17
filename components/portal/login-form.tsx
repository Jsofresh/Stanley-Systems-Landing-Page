"use client"

import { FormEvent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, BriefcaseBusiness, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PORTAL_TEST_USERS } from "@/lib/portal/test-users"

const TEST_PASSWORD = "stanley-test"

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState(PORTAL_TEST_USERS[0]?.email ?? "")
  const [password, setPassword] = useState(TEST_PASSWORD)
  const [error, setError] = useState<string | null>(null)

  const selectedUser = useMemo(
    () => PORTAL_TEST_USERS.find((user) => user.email === email) ?? PORTAL_TEST_USERS[0],
    [email],
  )

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
      if (!response.ok) throw new Error("Login failed. Pick a test account and use the assigned test password.")
      router.push("/portal")
      router.refresh()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <label className="block">
        <span className="text-sm font-bold text-[#102033]">Test persona</span>
        <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-[#ded6c8] bg-white px-3">
          <BriefcaseBusiness className="h-4 w-4 text-[#15803d]" />
          <select
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#102033] outline-none"
            aria-label="Choose Company Brain test persona"
          >
            {PORTAL_TEST_USERS.map((user) => (
              <option key={user.actorId} value={user.email}>
                {user.name} — {user.roleLabel}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className="block">
        <span className="text-sm font-bold text-[#102033]">Email</span>
        <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-[#ded6c8] bg-white px-3">
          <Mail className="h-4 w-4 text-[#15803d]" />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#102033] outline-none"
          />
        </span>
      </label>
      <label className="block">
        <span className="text-sm font-bold text-[#102033]">Password</span>
        <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-[#ded6c8] bg-white px-3">
          <LockKeyhole className="h-4 w-4 text-[#15803d]" />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#102033] outline-none"
          />
        </span>
      </label>
      <div className="rounded-xl border border-[#ded6c8] bg-[#fbf8f2] px-4 py-3 text-sm leading-6 text-[#5f6d7a]">
        <strong className="text-[#102033]">Signing in as:</strong> {selectedUser?.name} · {selectedUser?.roleLabel} · {selectedUser?.companyName}
      </div>
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-lg bg-[#15803d] text-base font-bold text-white hover:bg-[#116832]"
      >
        {loading ? "Opening Company Brain" : "Sign in to Company Brain"}
        <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-xs leading-5 text-[#667085]">
        These are non-production persona accounts for the destructive Company Brain test run. The live chat routes to brain-test through the Stanley UI session.
      </p>
    </form>
  )
}
