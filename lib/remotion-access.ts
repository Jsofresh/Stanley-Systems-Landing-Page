export const REMOTION_ACCESS_COOKIE = "stanley_remotion_access"

export function getRemotionAccessToken() {
  return process.env.REMOTION_ACCESS_TOKEN || ""
}

export function hasValidRemotionToken(value: string | undefined) {
  const expected = getRemotionAccessToken()
  return Boolean(expected) && Boolean(value) && value === expected
}
