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

  const blockedRequest = /\b(?:request|access) (?:is|was) blocked\b/i.test(normalized)
  const authorizationContext = /\b(?:admins?|administrators?|owners?|permissions?|roles?|access level|scope)\b/i.test(normalized)
  return blockedRequest && authorizationContext
}

module.exports = { isPermissionDenied }
