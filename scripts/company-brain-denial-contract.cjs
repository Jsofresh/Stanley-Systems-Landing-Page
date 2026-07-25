const DENIAL_PATTERNS = [
  /permission denied/i,
  /not permitted/i,
  /do(?:es)? not have (?:access|permission)/i,
  /can(?:not|['’]t) (?:show|access|provide)/i,
  /access is scoped to/i,
  /outside that scope/i,
]

function isPermissionDenied(value) {
  if (typeof value !== "string") return false
  const normalized = value.replace(/\s+/g, " ")
  return DENIAL_PATTERNS.some((pattern) => pattern.test(normalized))
}

module.exports = { isPermissionDenied }
