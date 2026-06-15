"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      router.push("/portal")
    }, 350)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <label className="block">
        <span className="text-sm font-bold text-[#102033]">Email</span>
        <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-[#ded6c8] bg-white px-3">
          <Mail className="h-4 w-4 text-[#15803d]" />
          <input
            type="email"
            defaultValue="owner@bayviewservice.example"
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
            defaultValue="mock-login"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#102033] outline-none"
          />
        </span>
      </label>
      <Button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-lg bg-[#15803d] text-base font-bold text-white hover:bg-[#116832]"
      >
        {loading ? "Opening portal" : "Open portal"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
