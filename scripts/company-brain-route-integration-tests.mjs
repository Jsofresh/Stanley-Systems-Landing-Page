import assert from "node:assert/strict"
import { rename, stat } from "node:fs/promises"

const baseUrl = (process.env.TEST_BASE_URL || "").replace(/\/$/, "")
const email = process.env.PORTAL_TEST_EMAIL || ""
const password = process.env.PORTAL_TEST_PASSWORD || ""
const storeDir = process.env.PORTAL_SESSION_STORE_DIR || ""

if (!baseUrl || !email || !password) {
  throw new Error("TEST_BASE_URL, PORTAL_TEST_EMAIL, and PORTAL_TEST_PASSWORD are required")
}

function cookieFrom(response) {
  const value = response.headers.get("set-cookie") || ""
  return value.split(";", 1)[0]
}

async function request(path, init = {}) {
  return fetch(`${baseUrl}${path}`, { redirect: "manual", ...init })
}

async function login(loginEmail = email, loginPassword = password) {
  return request("/api/portal/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
  })
}

const unauthenticated = await request("/api/portal/session")
assert.equal(unauthenticated.status, 401)
assert.deepEqual(await unauthenticated.json(), { authenticated: false })

const unknown = await login("unknown-user@invalid.test", "definitely-wrong-password")
assert.equal(unknown.status, 401)
const unknownBody = await unknown.json()
assert.deepEqual(Object.keys(unknownBody).sort(), ["error"])
assert.equal(JSON.stringify(unknownBody).includes("bayview"), false)

const invalid = await login(email, "definitely-wrong-password")
assert.equal(invalid.status, 401)
assert.deepEqual(Object.keys(await invalid.json()).sort(), ["error"])

const firstLogin = await login()
assert.equal(firstLogin.status, 200)
const firstCookie = cookieFrom(firstLogin)
assert.match(firstCookie, /^stanley_portal_session=/)
assert.match(firstLogin.headers.get("set-cookie") || "", /HttpOnly/i)
assert.match(firstLogin.headers.get("set-cookie") || "", /SameSite=Lax/i)

const secondLogin = await login()
assert.equal(secondLogin.status, 200)
const secondCookie = cookieFrom(secondLogin)
assert.notEqual(firstCookie, secondCookie)

const firstSession = await request("/api/portal/session", { headers: { cookie: firstCookie } })
const secondSession = await request("/api/portal/session", { headers: { cookie: secondCookie } })
assert.equal(firstSession.status, 200)
assert.equal(secondSession.status, 200)
const firstSessionBody = await firstSession.json()
const secondSessionBody = await secondSession.json()
assert.notEqual(firstSessionBody.session.loginSessionId, secondSessionBody.session.loginSessionId)
assert.equal(JSON.stringify(firstSessionBody).includes("sessionKey"), false)

const crossSessionArtifact = await request("/api/company-brain/artifacts/artifact_route_test_missing", {
  headers: { cookie: firstCookie },
})
assert.equal(crossSessionArtifact.status, 404)

const clientConfirmation = await request("/api/company-brain/actions/confirm", {
  method: "POST",
  headers: { cookie: firstCookie, "content-type": "application/json" },
  body: JSON.stringify({ action_reference: `actref_${"a".repeat(32)}` }),
})
assert.equal(clientConfirmation.status, 404)

const emptyUpload = new FormData()
emptyUpload.set("conversation_id", "conversation-route-test")
const emptyUploadResponse = await request("/api/company-brain/brain/uploads", {
  method: "POST",
  headers: { cookie: firstCookie },
  body: emptyUpload,
})
assert.equal(emptyUploadResponse.status, 400)

const unsupportedUpload = new FormData()
unsupportedUpload.set("conversation_id", "conversation-route-test")
unsupportedUpload.append("file", new Blob(["binary"], { type: "application/x-msdownload" }), "payload.exe")
const unsupportedUploadResponse = await request("/api/company-brain/brain/uploads", {
  method: "POST",
  headers: { cookie: firstCookie },
  body: unsupportedUpload,
})
assert.equal(unsupportedUploadResponse.status, 415)

const tooManyFiles = new FormData()
tooManyFiles.set("conversation_id", "conversation-route-test")
for (let index = 0; index < 6; index += 1) {
  tooManyFiles.append("file", new Blob([`file-${index}`], { type: "text/plain" }), `file-${index}.txt`)
}
const tooManyFilesResponse = await request("/api/company-brain/brain/uploads", {
  method: "POST",
  headers: { cookie: firstCookie },
  body: tooManyFiles,
})
assert.equal(tooManyFilesResponse.status, 400)

if (storeDir) {
  await stat(storeDir)
  const unavailablePath = `${storeDir}.route-test-unavailable`
  await rename(storeDir, unavailablePath)
  try {
    const unavailableLogout = await request("/api/portal/logout", {
      method: "POST",
      headers: { cookie: firstCookie },
    })
    assert.equal(unavailableLogout.status, 503)
  } finally {
    await rename(unavailablePath, storeDir)
  }
}

const logout = await request("/api/portal/logout", {
  method: "POST",
  headers: { cookie: firstCookie },
})
assert.equal(logout.status, 200)
const replay = await request("/api/portal/session", { headers: { cookie: firstCookie } })
assert.equal(replay.status, 401)
const independentSecondSession = await request("/api/portal/session", { headers: { cookie: secondCookie } })
assert.equal(independentSecondSession.status, 200)

console.log(JSON.stringify({
  status: "pass",
  checks: 20,
  secrets_printed: false,
}))
