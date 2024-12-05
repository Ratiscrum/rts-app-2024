export interface ChatMessage {
  id: number;
  content: string | undefined;
  role: 'user' | 'assistant';
}

export interface Conversation {
  messages: ChatMessage[];
}
