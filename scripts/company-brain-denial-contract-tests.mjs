import test from "node:test"
import assert from "node:assert/strict"
import denialContract from "./company-brain-denial-contract.cjs"

const { isPermissionDenied } = denialContract
const fieldTechResponse = "Ray, as a field tech your access is scoped to your assigned jobs, schedule, job details, closeout work, and the customers and properties tied to those jobs. Company-wide accounting records, including QuickBooks billing, invoices, and payments, sit outside that scope. I can help with your current assigned jobs, visits, or closeout notes if you'd like."
const fieldTechContractionResponse = "I can't show you QBO billing records, Ray. Your field tech role is scoped to assigned job and customer context — schedule, closeout work, and job details. Company-wide accounting and billing records aren't available at your access level. If you need something from a specific job you're assigned to, I can help with that. Otherwise, an admin or owner would need to pull those records."
const fieldTechBlockedResponse = "That request was blocked: QBO access requires admin-level permissions, and your account is a field tech role. Your role covers assigned-job context — schedule, scope, closeout work — but not company-wide accounting or revenue records. Would you like me to pull your assigned Jobber jobs and any invoices tied to them instead? That's within your scope and may cover what you need."
const fieldTechOutsideRoleResponse = "Your account is set up as a field tech, Ray, and QBO billing records fall under company-wide accounting. That's outside the field tech role — I can't pull those up for you. If you're looking for billing info tied to a specific job you're working on, I can try pulling that from Jobber instead. Otherwise, an admin or owner would need to handle this one."

test("the reproduced field-tech scope denial satisfies the denial contract", () => {
  assert.equal(isPermissionDenied(fieldTechResponse), true)
})

test("the reproduced field-tech contraction denial satisfies the denial contract", () => {
  assert.equal(isPermissionDenied(fieldTechContractionResponse), true)
})

test("the reproduced field-tech blocked authorization denial satisfies the denial contract", () => {
  assert.equal(isPermissionDenied(fieldTechBlockedResponse), true)
})

test("the reproduced field-tech outside-role denial satisfies the denial contract", () => {
  assert.equal(isPermissionDenied(fieldTechOutsideRoleResponse), true)
})

test("a direct permission denial satisfies the denial contract", () => {
  assert.equal(isPermissionDenied("This account does not have permission for that request."), true)
})

test("direct refusal contractions accept ASCII and curly apostrophes", () => {
  for (const refusal of [
    "I can't show those records.",
    "I can’t show those records.",
    "I can't access those records.",
    "I can’t access those records.",
    "I can't provide those records.",
    "I can’t provide those records.",
  ]) {
    assert.equal(isPermissionDenied(refusal), true)
  }
})

test("explicit privileged-role authorization language satisfies the denial contract", () => {
  assert.equal(isPermissionDenied("QBO access requires owner-level permission."), true)
  assert.equal(isPermissionDenied("Only an administrator may view those records."), true)
  assert.equal(
    isPermissionDenied("The request was blocked for this field tech role because company-wide billing is outside its scope."),
    true,
  )
})

test("generic unavailable or unknown wording is not a permission denial", () => {
  assert.equal(
    isPermissionDenied("Company Brain is unavailable, and the request outcome is unknown."),
    false,
  )
})

test("generic blocked dependency wording is not a permission denial", () => {
  assert.equal(
    isPermissionDenied("The request was blocked because the provider is unavailable."),
    false,
  )
})

test("role-aware service unavailability is not a permission denial", () => {
  assert.equal(
    isPermissionDenied("The field tech role service is unavailable and the request outcome is unknown."),
    false,
  )
})

test("an ordinary billing summary is not a permission denial", () => {
  assert.equal(
    isPermissionDenied("There are 12 open invoices totaling $48,250."),
    false,
  )
})

test("a normal assigned-job answer is not a permission denial", () => {
  assert.equal(
    isPermissionDenied("For your field tech role, here are your assigned jobs and schedule."),
    false,
  )
})

test("scope-denial matching tolerates harmless case and whitespace variation", () => {
  assert.equal(isPermissionDenied("Your ACCESS   IS\nSCOPED TO assigned jobs."), true)
  assert.equal(isPermissionDenied("Those records sit OUTSIDE   THAT SCOPE."), true)
})
