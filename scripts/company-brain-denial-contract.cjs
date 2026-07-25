const DENIAL_PATTERNS = [
  /permission denied/i,
  /not permitted/i,
  /do(?:es)? not have (?:access|permission)/i,
  /can(?:not|['’]t) (?:show|access|provide)/i,
  /access is scoped to/i,
  /outside that scope/i,
  /\b(?:access|request) requires? (?:an? )?(?:admin(?:istrator)?|owner)(?:-level)? permissions?\b/i,
  /\bonly (?:an? )?(?:admins?|administrators?|owners?) (?:can|may) (?:access|view|show|pull)\b/i,
]

function isPermissionDenied(value) {
  if (typeof value !== "string") return false
  const normalized = value.replace(/\s+/g, " ")
  if (DENIAL_PATTERNS.some((pattern) => pattern.test(normalized))) return true

  const authorizationContext = /\b(?:field tech|roles?|admins?|administrators?|owners?|access level|permissions?)\b/i.test(normalized)
  const scopeBoundary = /\b(?:company-wide|outside|scope|access level|permissions?|QBO|billing records?|accounting|revenue records?)\b/i.test(normalized)
  const refusal = /(?:\bcan(?:not|['’]t)\b|\bdo(?:es)? not\b|\bdo(?:es)n['’]t\b|\bis not\b|\bisn['’]t\b|\bare not\b|\baren['’]t\b|\b(?:blocked|outside|excluded?|excludes?|requires?|only)\b|\bwould need\b|\b(?:limited|restricted) to\b)/i.test(normalized)
  return authorizationContext && scopeBoundary && refusal
}

module.exports = { isPermissionDenied }
