export type PortalTestUser = {
  actorId: string
  name: string
  email: string
  role: "owner" | "dispatcher_admin" | "accounting_admin" | "field_tech" | "outsider"
  roleLabel: string
  companyId: string
  companyName: string
  sessionPrefix: string
}

export const PORTAL_TEST_COMPANY_ID = "bayview_test"
export const PORTAL_TEST_COMPANY_NAME = "Bayview Service Co."
export const STANLEY_TEST_OFFICE_COMPANY_ID = "stanley_test_office"
export const STANLEY_TEST_OFFICE_COMPANY_NAME = "Stanley Systems Test Office"
export const STANLEY_SIMULATION_COMPANY_ID = "stanley_simulation"
export const STANLEY_SIMULATION_COMPANY_NAME = "Meridian Climate & Plumbing"

export const PORTAL_TEST_USERS: PortalTestUser[] = [
  {
    actorId: "sarah-owner",
    name: "Sarah Owner",
    email: "sarah.owner@bayview.test",
    role: "owner",
    roleLabel: "Owner",
    companyId: PORTAL_TEST_COMPANY_ID,
    companyName: PORTAL_TEST_COMPANY_NAME,
    sessionPrefix: "sarah",
  },
  {
    actorId: "mike-dispatch",
    name: "Mike Dispatcher",
    email: "mike.dispatch@bayview.test",
    role: "dispatcher_admin",
    roleLabel: "Dispatcher / Office Admin",
    companyId: PORTAL_TEST_COMPANY_ID,
    companyName: PORTAL_TEST_COMPANY_NAME,
    sessionPrefix: "mike",
  },
  {
    actorId: "lisa-accounting",
    name: "Lisa Accounting",
    email: "lisa.accounting@bayview.test",
    role: "accounting_admin",
    roleLabel: "Accounting Admin",
    companyId: PORTAL_TEST_COMPANY_ID,
    companyName: PORTAL_TEST_COMPANY_NAME,
    sessionPrefix: "lisa",
  },
  {
    actorId: "ray-tech",
    name: "Ray Field Tech",
    email: "ray.tech@bayview.test",
    role: "field_tech",
    roleLabel: "Field Tech",
    companyId: PORTAL_TEST_COMPANY_ID,
    companyName: PORTAL_TEST_COMPANY_NAME,
    sessionPrefix: "ray",
  },
  {
    actorId: "adversary-outsider",
    name: "Adversarial Outsider",
    email: "outsider@external.test",
    role: "outsider",
    roleLabel: "Unauthorized Outsider",
    companyId: PORTAL_TEST_COMPANY_ID,
    companyName: PORTAL_TEST_COMPANY_NAME,
    sessionPrefix: "outsider",
  },
  {
    actorId: "alex-owner",
    name: "Alex Owner",
    email: "alex.owner@stanley.test",
    role: "owner",
    roleLabel: "Owner",
    companyId: STANLEY_TEST_OFFICE_COMPANY_ID,
    companyName: STANLEY_TEST_OFFICE_COMPANY_NAME,
    sessionPrefix: "alex",
  },
  {
    actorId: "evelyn-owner",
    name: "Evelyn Hart",
    email: "evelyn.owner@meridian.test",
    role: "owner",
    roleLabel: "Owner",
    companyId: STANLEY_SIMULATION_COMPANY_ID,
    companyName: STANLEY_SIMULATION_COMPANY_NAME,
    sessionPrefix: "evelyn",
  },
]

export function publicPortalUsers() {
  return PORTAL_TEST_USERS.map(({ actorId, name, email, role, roleLabel, companyId, companyName }) => ({
    actorId,
    name,
    email,
    role,
    roleLabel,
    companyId,
    companyName,
  }))
}

export function findPortalUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  return PORTAL_TEST_USERS.find((user) => user.email.toLowerCase() === normalized) ?? null
}
