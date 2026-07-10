type IdentifiedMessage = { id: string }

export type ConversationState<Message extends IdentifiedMessage> = {
  id: string
  title: string
  messages: Message[]
}

function deduplicateMessages<Message extends IdentifiedMessage>(messages: Message[]) {
  const seen = new Set<string>()
  return messages.filter((message) => {
    if (seen.has(message.id)) return false
    seen.add(message.id)
    return true
  })
}

export function replaceConversationMessages<Message extends IdentifiedMessage>(
  conversations: ConversationState<Message>[],
  conversationId: string,
  title: string,
  messages: Message[],
) {
  const replacement = {
    id: conversationId,
    title: title || "New conversation",
    messages: deduplicateMessages(messages),
  }
  return [replacement, ...conversations.filter((conversation) => conversation.id !== conversationId)]
}

export function appendMessageToConversation<Message extends IdentifiedMessage>(
  conversations: ConversationState<Message>[],
  conversationId: string,
  message: Message,
  fallbackTitle = "New conversation",
) {
  const existing = conversations.find((conversation) => conversation.id === conversationId)
  return replaceConversationMessages(
    conversations,
    conversationId,
    existing?.title || fallbackTitle,
    [...(existing?.messages ?? []), message],
  )
}
