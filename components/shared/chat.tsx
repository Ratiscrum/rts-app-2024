'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { ChatBubble } from '@/components/ui/chat/chat-bubble';
import { ChatBubbleAvatar } from '@/components/ui/chat/chat-bubble';
import { ChatBubbleMessage } from '@/components/ui/chat/chat-bubble';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useWllama } from '@/lib/providers/llm-provider';
import { ChatMessage, Conversation } from '@/lib/types/chat';
import { formatChat } from '@/lib/utils/llm.utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function Chat() {
  const [conversation, setConversation] = useState<Conversation>({
    messages: [],
  });
  const {
    generate,
    isUnsupported,
    isGenerating,
    isModelLoading,
    getWllamaInstance,
  } = useWllama();

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const currHistory = conversation.messages;

    const userMessage: ChatMessage = {
      id: Date.now(),
      content: formData.get('message') as string,
      role: 'user',
    };

    const aiMessage: ChatMessage = {
      id: Date.now() + 1,
      content: '',
      role: 'assistant',
    };

    setConversation({
      messages: [...conversation.messages, userMessage, aiMessage],
    });

    event.currentTarget.reset();
    const formattedChat = await formatChat(getWllamaInstance(), [
      ...currHistory,
      userMessage,
    ]);

    await generate(formattedChat, (newContent: string | undefined) => {
      setConversation({
        messages: [
          ...conversation.messages,
          userMessage,
          { ...aiMessage, content: newContent },
        ],
      });
    });

    console.log('conversation', conversation);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !isGenerating &&
      !isModelLoading
    ) {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) form.requestSubmit();
    }
  };

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [conversation.messages]);

  useEffect(() => {
    setConversation((prevConversation) => ({
      messages: [
        ...prevConversation.messages,
        {
          id: Date.now(),
          content: isModelLoading
            ? 'Nous sommes en train de télécharger une IA dans votre navigateur. Veuillez patienter quelques instants...'
            : isUnsupported
              ? 'Votre navigateur ou/et votre télephone ne prend pas en charge cette IA.'
              : "L'IA est prête à discuter avec vous",
          role: 'assistant',
        },
      ],
    }));
  }, [isModelLoading, isUnsupported]);

  return (
    <div className="lg:mx-4">
      <h1 className="text-lg font-bold lg:text-2xl">Chat with an AI</h1>
      <div className="mt-4 flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <ChatMessageList
          ref={messagesContainerRef}
          className="h-[calc(100vh-350px)]"
        >
          <AnimatePresence>
            {conversation.messages.map((msg, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: index * 0.05 + 0.2,
                  },
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                className="flex flex-col gap-2 p-4"
              >
                <ChatBubble variant={msg.role}>
                  <ChatBubbleAvatar
                    fallback={msg.role === 'user' ? 'Me' : '🐒'}
                  />
                  {msg.role === 'assistant' && msg.content === '' ? (
                    <ChatBubbleMessage isLoading>
                      {msg.content}
                    </ChatBubbleMessage>
                  ) : (
                    <ChatBubbleMessage>{msg.content}</ChatBubbleMessage>
                  )}
                </ChatBubble>
                {isModelLoading && (
                  <ChatBubble variant="assistant">
                    <ChatBubbleAvatar fallback="🐀" />
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </ChatMessageList>

        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 border-t border-border bg-muted p-2 focus-within:ring-ring"
        >
          <ChatInput
            placeholder="Type your message here..."
            name="message"
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none"
          />
          <Button
            type="submit"
            disabled={isGenerating || isModelLoading || isUnsupported}
            className="flex items-center gap-1"
          >
            {isGenerating ? 'Sending...' : <Send />}
          </Button>
        </form>
      </div>
    </div>
  );
}
