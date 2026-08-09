import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

export const runtime = "nodejs"

const SECRETS_DIR = process.env.CONTENT_SYSTEM_SECRETS_DIR || "/home/jaden/.config/stanley-systems/secrets/content-system"
const ENV_FILE = process.env.CONTENT_SYSTEM_ENV_FILE || path.join(SECRETS_DIR, ".env")
const TOKEN_FILE = process.env.CONTENT_SYSTEM_OAUTH_TOKEN_FILE || path.join(SECRETS_DIR, "oauth-tokens.json")
const STATE_FILE = process.env.CONTENT_SYSTEM_OAUTH_STATE_FILE || path.join(SECRETS_DIR, "oauth-states.json")
const STATE_TTL_SECONDS = Number(process.env.CONTENT_SYSTEM_OAUTH_STATE_TTL_SECONDS || 900)

type EnvMap = Record<string, string>
type JsonMap = Record<string, any>

type PlatformConfig = {
  key: string
  name: string
  authUrl: string
  tokenUrl: string
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
  extraAuth?: Record<string, string>
  tokenAuth?: "body" | "basic"
  pkce?: boolean
  clientKeyParam?: boolean
}

const PLATFORM_CONFIGS: Record<string, Omit<PlatformConfig, "key">> = {
  youtube: {
    name: "YouTube",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    clientId: "YOUTUBE_CLIENT_ID",
    clientSecret: "YOUTUBE_CLIENT_SECRET",
    redirectUri: "YOUTUBE_REDIRECT_URI",
    scopes: ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.readonly"],
    extraAuth: { access_type: "offline", prompt: "consent", include_granted_scopes: "true" },
    tokenAuth: "body",
  },
  linkedin: {
    name: "LinkedIn",
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    // LinkedIn Community Management API must live on its own app. Use the
    // dedicated org/page app credentials here so Content System cannot silently
    // authorize a member/personal-posting app for Stanley page publishing.
    clientId: "LINKEDIN_ORG_CLIENT_ID",
    clientSecret: "LINKEDIN_ORG_CLIENT_SECRET",
    redirectUri: "LINKEDIN_REDIRECT_URI",
    scopes: ["openid", "profile", "email", "r_organization_social", "w_organization_social"],
    tokenAuth: "body",
  },
  x: {
    name: "X",
    authUrl: "https://x.com/i/oauth2/authorize",
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    clientId: "X_OAUTH2_CLIENT_ID",
    clientSecret: "X_OAUTH2_CLIENT_SECRET",
    redirectUri: "X_REDIRECT_URI",
    scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
    tokenAuth: "basic",
    pkce: true,
  },
  tiktok: {
    name: "TikTok",
    authUrl: "https://www.tiktok.com/v2/auth/authorize/",
    tokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
    clientId: "TIKTOK_CLIENT_KEY",
    clientSecret: "TIKTOK_CLIENT_SECRET",
    redirectUri: "TIKTOK_REDIRECT_URI",
    scopes: ["user.info.basic", "video.upload", "video.publish"],
    tokenAuth: "body",
    pkce: true,
    clientKeyParam: true,
  },
  meta: {
    name: "Meta",
    authUrl: "https://www.facebook.com/v20.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v20.0/oauth/access_token",
    clientId: "META_CLIENT_ID",
    clientSecret: "META_CLIENT_SECRET",
    redirectUri: "META_REDIRECT_URI",
    scopes: ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "instagram_basic", "instagram_content_publish"],
    tokenAuth: "body",
  },
}

export function knownPlatform(platform: string) {
  return Object.prototype.hasOwnProperty.call(PLATFORM_CONFIGS, platform)
}

export async function loadEnvFile(): Promise<EnvMap> {
  const env: EnvMap = {}
  try {
    const text = await fs.readFile(ENV_FILE, "utf8")
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim()
      if (!line || line.startsWith("#") || !line.includes("=")) continue
      const idx = line.indexOf("=")
      const key = line.slice(0, idx).trim()
      let value = line.slice(idx + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      env[key] = value
    }
  } catch {}
  for (const [key, value] of Object.entries(process.env)) {
    if (!value) continue
    if (/^(YOUTUBE_|LINKEDIN_|X_|TIKTOK_|META_|POSTHOG_|GA4_|CONTENT_SYSTEM_)/.test(key)) env[key] = value
  }
  return env
}

export function getPlatformConfig(platform: string, env: EnvMap) {
  const base = PLATFORM_CONFIGS[platform]
  if (!base) return null
  const cfg: PlatformConfig = { key: platform, ...base }
  const missingFields = [cfg.clientId, cfg.clientSecret, cfg.redirectUri].filter((k) => !env[k])
  return { cfg, missingFields }
}

function b64url(buffer: Buffer) {
  return buffer.toString("base64url")
}

function stateDigest(state: string) {
  return crypto.createHash("sha256").update(state).digest("hex")
}

function makePkce() {
  const verifier = b64url(crypto.randomBytes(48))
  const challenge = b64url(crypto.createHash("sha256").update(verifier).digest())
  return { verifier, challenge }
}

async function readJson(file: string): Promise<JsonMap> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"))
  } catch {
    return {}
  }
}

async function writeJson600(file: string, data: JsonMap) {
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 })
  const tmp = path.join(path.dirname(file), `.${path.basename(file)}.${process.pid}.${Date.now()}.${crypto.randomUUID()}`)
  try {
    await fs.writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, { mode: 0o600 })
    await fs.chmod(tmp, 0o600)
    await fs.rename(tmp, file)
    await fs.chmod(file, 0o600)
  } finally {
    await fs.rm(tmp, { force: true }).catch(() => {})
  }
}

function pruneStates(states: JsonMap) {
  const now = Math.floor(Date.now() / 1000)
  return Object.fromEntries(Object.entries(states).filter(([, value]) => Number(value?.expires_at || 0) > now))
}

export async function buildAuthorizationRedirect(platform: string) {
  const env = await loadEnvFile()
  const resolved = getPlatformConfig(platform, env)
  if (!resolved) return { error: "unknown_platform", status: 404 as const }
  const { cfg, missingFields } = resolved
  if (missingFields.length) return { error: "missing_fields", missingFields, status: 400 as const }

  const state = b64url(crypto.randomBytes(32))
  const pkce = cfg.pkce ? makePkce() : null
  const states = pruneStates(await readJson(STATE_FILE))
  states[stateDigest(state)] = {
    platform,
    created_at: Math.floor(Date.now() / 1000),
    expires_at: Math.floor(Date.now() / 1000) + STATE_TTL_SECONDS,
    pkce_verifier: pkce?.verifier || null,
  }
  await writeJson600(STATE_FILE, states)

  const params = new URLSearchParams({
    response_type: "code",
    redirect_uri: env[cfg.redirectUri],
    scope: cfg.scopes.join(" "),
    state,
    ...(cfg.extraAuth || {}),
  })
  if (cfg.clientKeyParam) params.set("client_key", env[cfg.clientId])
  else params.set("client_id", env[cfg.clientId])
  if (pkce) {
    params.set("code_challenge", pkce.challenge)
    params.set("code_challenge_method", "S256")
  }
  return { redirect: `${cfg.authUrl}?${params.toString()}`, status: 302 as const }
}

async function verifyAndConsumeState(platform: string, state: string) {
  if (!state) return null
  const states = pruneStates(await readJson(STATE_FILE))
  const key = stateDigest(state)
  const record = states[key]
  delete states[key]
  await writeJson600(STATE_FILE, states)
  if (!record || record.platform !== platform) return null
  return record
}

async function exchangeCode(cfg: PlatformConfig, env: EnvMap, code: string, verifier?: string | null) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: env[cfg.redirectUri],
  })
  if (cfg.clientKeyParam) body.set("client_key", env[cfg.clientId])
  else body.set("client_id", env[cfg.clientId])
  if (verifier) body.set("code_verifier", verifier)

  const headers: Record<string, string> = { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }
  if (cfg.tokenAuth === "basic") {
    headers.Authorization = `Basic ${Buffer.from(`${env[cfg.clientId]}:${env[cfg.clientSecret]}`).toString("base64")}`
  } else {
    body.set("client_secret", env[cfg.clientSecret])
  }

  const response = await fetch(cfg.tokenUrl, { method: "POST", headers, body, cache: "no-store" })
  if (!response.ok) throw new Error(`token_exchange_http_${response.status}`)
  return response.json()
}

function pickTokenFields(raw: JsonMap) {
  const source = raw?.data && typeof raw.data === "object" ? { ...raw.data, ...raw } : raw
  const allowed = ["access_token", "refresh_token", "expires_in", "scope", "token_type", "id_token", "refresh_expires_in", "open_id", "union_id"]
  return Object.fromEntries(allowed.filter((key) => source[key] != null).map((key) => [key, source[key]]))
}

async function bearerGet(url: string, accessToken: string, params?: Record<string, string>) {
  try {
    const requestUrl = new URL(url)
    for (const [key, value] of Object.entries(params || {})) requestUrl.searchParams.set(key, value)
    const response = await fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "LinkedIn-Version": "202411",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      cache: "no-store",
    })
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

async function fetchMetadata(platform: string, tokenFields: JsonMap, env: EnvMap) {
  const access = tokenFields.access_token
  const metadata: JsonMap = { account_ids: [], page_ids: [], channel_ids: [], organization_ids: [] }
  if (!access) return metadata
  if (platform === "youtube") {
    const data = await bearerGet("https://www.googleapis.com/youtube/v3/channels", access, { part: "id", mine: "true" })
    metadata.channel_ids = (data?.items || []).map((item: any) => item.id).filter(Boolean)
  } else if (platform === "linkedin") {
    const data = await bearerGet("https://api.linkedin.com/v2/userinfo", access)
    if (data?.sub) metadata.account_ids = [String(data.sub)]

    const configuredOrganizationId = env.LINKEDIN_ORGANIZATION_ID
    const vanityLookup = await bearerGet("https://api.linkedin.com/v2/organizations", access, { q: "vanityName", vanityName: "stanley-systems" })
    const vanityOrganizationIds = (vanityLookup?.elements || []).map((org: any) => org.id).filter(Boolean).map(String)
    const adminLookup = await bearerGet("https://api.linkedin.com/v2/organizationAcls", access, {
      q: "roleAssignee",
      role: "ADMINISTRATOR",
      projection: "(elements*(organization~(id,localizedName,vanityName)))",
    })
    const adminOrganizationIds = (adminLookup?.elements || [])
      .map((entry: any) => entry?.["organization~"]?.id || String(entry?.organization || "").replace("urn:li:organization:", ""))
      .filter(Boolean)
      .map(String)
    metadata.organization_ids = Array.from(new Set([configuredOrganizationId, ...vanityOrganizationIds, ...adminOrganizationIds].filter(Boolean).map(String)))
  } else if (platform === "x") {
    const data = await bearerGet("https://api.twitter.com/2/users/me", access)
    if (data?.data?.id) metadata.account_ids = [String(data.data.id)]
  } else if (platform === "tiktok") {
    const data = await bearerGet("https://open.tiktokapis.com/v2/user/info/", access, { fields: "open_id,union_id" })
    const user = data?.data?.user || {}
    metadata.account_ids = [user.open_id, user.union_id].filter(Boolean).map(String)
  } else if (platform === "meta") {
    const me = await bearerGet("https://graph.facebook.com/v20.0/me", access, { fields: "id" })
    if (me?.id) metadata.account_ids = [String(me.id)]
    const pages = await bearerGet("https://graph.facebook.com/v20.0/me/accounts", access, { fields: "id" })
    metadata.page_ids = (pages?.data || []).map((page: any) => page.id).filter(Boolean).map(String)
  }
  return metadata
}

export async function handleCallback(platform: string, requestUrl: string) {
  const env = await loadEnvFile()
  const resolved = getPlatformConfig(platform, env)
  if (!resolved) return { ok: false, status: 404, message: "Unknown OAuth platform." }
  const { cfg, missingFields } = resolved
  if (missingFields.length) return { ok: false, status: 400, message: `Missing OAuth configuration fields: ${missingFields.join(", ")}` }

  const url = new URL(requestUrl)
  if (url.searchParams.get("error")) return { ok: false, status: 400, message: "The provider returned an OAuth error." }
  const code = url.searchParams.get("code") || ""
  const state = url.searchParams.get("state") || ""
  const stateRecord = await verifyAndConsumeState(platform, state)
  if (!code || !stateRecord) return { ok: false, status: 400, message: "Invalid or expired OAuth state." }

  try {
    const raw = await exchangeCode(cfg, env, code, stateRecord.pkce_verifier)
    const tokenFields = pickTokenFields(raw)
    const tokens = await readJson(TOKEN_FILE)
    tokens[platform] = {
      platform,
      connected: true,
      connected_at: Math.floor(Date.now() / 1000),
      scopes_requested: cfg.scopes,
      tokens: tokenFields,
      metadata: await fetchMetadata(platform, tokenFields, env),
    }
    await writeJson600(TOKEN_FILE, tokens)
    return { ok: true, status: 200, platformName: cfg.name }
  } catch {
    return { ok: false, status: 502, message: "OAuth token exchange failed. No token details were exposed." }
  }
}

export async function integrationReadiness(platform: string) {
  const env = await loadEnvFile()
  if (["youtube", "linkedin", "x", "tiktok", "meta"].includes(platform)) {
    const resolved = getPlatformConfig(platform, env)
    if (!resolved) return { error: "not_found" }
    const { missingFields } = resolved
    const tokens = await readJson(TOKEN_FILE)
    const entry = tokens[platform] || {}
    const metadata = entry.metadata || {}
    const tokenNames = Object.keys(entry.tokens || {})
    const missing = new Set(missingFields)
    const hasToken = tokenNames.some((key) => key === "access_token" || key === "refresh_token")
    if (!hasToken) missing.add(`${platform.toUpperCase()}_OAUTH_CONNECTION`)
    if (platform === "linkedin") {
      const tokenScope = String(entry.tokens?.scope || "")
      const requestedScopes = Array.isArray(entry.scopes_requested) ? entry.scopes_requested : []
      const hasOrgScope = tokenScope.includes("w_organization_social") || requestedScopes.includes("w_organization_social")
      const orgIds = metadata.organization_ids || []
      // Stanley content must publish to the Stanley Systems Page, not the
      // connecting member's personal feed. Keep readiness false until the token
      // has organization posting scope and a concrete organization id.
      if (!hasOrgScope || !orgIds.length) {
        missing.add("LINKEDIN_ORGANIZATION_ID")
        missing.add("LINKEDIN_ORG_OAUTH_CONNECTION")
      }
    }
    return {
      platform,
      ready: missing.size === 0,
      connected: Boolean(entry.connected),
      missing_fields: Array.from(missing).sort(),
      account_ids: metadata.account_ids || [],
      page_ids: metadata.page_ids || [],
      channel_ids: metadata.channel_ids || [],
      organization_ids: metadata.organization_ids || [],
    }
  }
  if (platform === "posthog") {
    const missing = ["POSTHOG_API_KEY", "POSTHOG_HOST"].filter((key) => !env[key])
    return { platform, ready: missing.length === 0, missing_fields: missing }
  }
  if (platform === "ga4") {
    const missing = ["GA4_MEASUREMENT_ID", "GA4_MEASUREMENT_PROTOCOL_SECRET"].filter((key) => !env[key])
    return {
      platform,
      ready: missing.length === 0,
      missing_fields: missing,
      measurement_id: env.GA4_MEASUREMENT_ID || undefined,
      stream_id: env.GA4_STREAM_ID || undefined,
    }
  }
  return { error: "not_found" }
}
