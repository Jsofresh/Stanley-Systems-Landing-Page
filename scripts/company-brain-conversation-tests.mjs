import test from "node:test"
import assert from "node:assert/strict"
import {
  appendMessageToConversation,
  replaceConversationMessages,
} from "../lib/portal/conversation-state.ts"

const message = (id, role = "assistant") => ({ id, role, createdAt: "2026-07-09T00:00:00Z", blocks: [] })

test("a response is appended only to its originating conversation", () => {
  const conversations = [
    { id: "conversation-a", title: "A", messages: [message("a-user", "user")] },
    { id: "conversation-b", title: "B", messages: [message("b-user", "user")] },
  ]
  const next = appendMessageToConversation(conversations, "conversation-a", message("a-answer"))
  assert.deepEqual(next.find((item) => item.id === "conversation-a").messages.map((item) => item.id), ["a-user", "a-answer"])
  assert.deepEqual(next.find((item) => item.id === "conversation-b").messages.map((item) => item.id), ["b-user"])
})

test("conversation updates deduplicate retried message identifiers", () => {
  const conversations = [{ id: "conversation-a", title: "A", messages: [message("answer")] }]
  const next = appendMessageToConversation(conversations, "conversation-a", message("answer"))
  assert.equal(next[0].messages.length, 1)
})

test("replacing an origin conversation never overwrites another conversation", () => {
  const conversations = [{ id: "conversation-b", title: "B", messages: [message("b-user", "user")] }]
  const next = replaceConversationMessages(conversations, "conversation-a", "A", [message("a-user", "user")])
  assert.deepEqual(next.find((item) => item.id === "conversation-a").messages.map((item) => item.id), ["a-user"])
  assert.deepEqual(next.find((item) => item.id === "conversation-b").messages.map((item) => item.id), ["b-user"])
})
