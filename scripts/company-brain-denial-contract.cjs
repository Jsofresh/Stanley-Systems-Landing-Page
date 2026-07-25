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
  const scopeBoundary = /\b(?:company-wide|assigned[- ]jobs?|outside|scope|access level|billing records?|accounting|revenue records?)\b/i.test(normalized)
  const refusal = /\b(?:can(?:not|['’]t)|blocked|not (?:authorized|allowed|available|within)|requires?|only|would need)\b/i.test(normalized)
  return authorizationContext && scopeBoundary && refusal
}

module.exports = { isPermissionDenied }
