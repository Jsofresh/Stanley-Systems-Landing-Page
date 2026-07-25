import test from "node:test"
import assert from "node:assert/strict"
import denialContract from "./company-brain-denial-contract.cjs"

const { isPermissionDenied } = denialContract
const fieldTechResponse = "Ray, as a field tech your access is scoped to your assigned jobs, schedule, job details, closeout work, and the customers and properties tied to those jobs. Company-wide accounting records, including QuickBooks billing, invoices, and payments, sit outside that scope. I can help with your current assigned jobs, visits, or closeout notes if you'd like."
const fieldTechContractionResponse = "I can't show you QBO billing records, Ray. Your field tech role is scoped to assigned job and customer context — schedule, closeout work, and job details. Company-wide accounting and billing records aren't available at your access level. If you need something from a specific job you're assigned to, I can help with that. Otherwise, an admin or owner would need to pull those records."

test("the reproduced field-tech scope denial satisfies the denial contract", () => {
  assert.equal(isPermissionDenied(fieldTechResponse), true)
})

test("the reproduced field-tech contraction denial satisfies the denial contract", () => {
  assert.equal(isPermissionDenied(fieldTechContractionResponse), true)
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

test("generic unavailable or unknown wording is not a permission denial", () => {
  assert.equal(
    isPermissionDenied("Company Brain is unavailable, and the request outcome is unknown."),
    false,
  )
})

test("an ordinary billing summary is not a permission denial", () => {
  assert.equal(
    isPermissionDenied("There are 12 open invoices totaling $48,250."),
    false,
  )
})

test("scope-denial matching tolerates harmless case and whitespace variation", () => {
  assert.equal(isPermissionDenied("Your ACCESS   IS\nSCOPED TO assigned jobs."), true)
  assert.equal(isPermissionDenied("Those records sit OUTSIDE   THAT SCOPE."), true)
})
