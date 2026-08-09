import { PortalApp } from "@/components/portal/portal-app"
import { requirePortalSession } from "@/lib/portal/session"

export const dynamic = "force-dynamic"

export default function PortalPage() {
  requirePortalSession()
  return <PortalApp />
}
