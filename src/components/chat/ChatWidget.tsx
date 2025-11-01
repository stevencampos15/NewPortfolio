"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_ASSISTANT_MESSAGE =
  "Hi! I’m your portfolio assistant. Ask me about Steven’s projects, experience, or this website.";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed bottom-4 right-4 z-50">{children}</div>
);

const FloatingButton: React.FC<{
  isOpen: boolean;
  handleClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}> = ({ isOpen, handleClick, handleKeyDown }) => (
  <button
    type="button"
    aria-label={isOpen ? "Close chat" : "Open chat"}
    tabIndex={0}
    onClick={handleClick}
    onKeyDown={handleKeyDown}
    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 h-12 w-12 flex items-center justify-center"
  >
    <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden
    >
      {isOpen ? (
        <path
          fillRule="evenodd"
          d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.36-4.36a1 1 0 1 1 1.415 1.415L13.415 10.6l4.36 4.36a1 1 0 0 1-1.415 1.415L12 12.015l-4.36 4.36a1 1 0 0 1-1.415-1.414l4.361-4.36-4.36-4.36a1 1 0 0 1 0-1.415Z"
          clipRule="evenodd"
        />
      ) : (
        <path d="M2.25 12.76c0 1.264.474 2.423 1.26 3.31V21l4.93-2.466c.15.01.3.016.455.016 4.28 0 7.75-3.05 7.75-6.81S13.175 4.93 8.895 4.93c-4.28 0-7.75 3.05-7.75 6.81Z" />
      )}
    </svg>
  </button>
);

const Panel: React.FC<{ children: React.ReactNode; isOpen: boolean } & {
  handleClose: () => void;
}> = ({ children, isOpen, handleClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="AI chat"
      className={
        (isOpen ? "" : "hidden ") +
        "w-96 max-w-[95vw] h-[28rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl flex flex-col overflow-hidden"
      }
    >
      {children}
    </div>
  );
};

const MessageBubble: React.FC<{ msg: ChatMessage }> = ({ msg }) => (
  <div
    className={
      "px-3 py-2 rounded-lg text-sm whitespace-pre-wrap " +
      (msg.role === "user"
        ? "bg-blue-600 text-white self-end"
        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 self-start")
    }
  >
    {msg.content}
  </div>
);

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: INITIAL_ASSISTANT_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const handleButtonKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isSending) return;
    setIsSending(true);
    setInput("");

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ];
    setMessages(nextMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok || !res.body) {
        throw new Error("Failed to get response");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantText = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value || new Uint8Array(), { stream: !done });
        if (chunkValue) {
          assistantText += chunkValue;
          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              updated[lastIdx] = { role: "assistant", content: assistantText };
            }
            return updated;
          });
        }
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsSending(false);
    }
  }, [input, isSending, messages]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === "Enter" && !e.shiftKey)) {
      e.preventDefault();
      void handleSend();
    }
  }, [handleSend]);

  return (
    <Container>
      <div className="flex flex-col items-end gap-3">
        <Panel isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200 dark:border-neutral-800">
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">AI Assistant</div>
            <button
              type="button"
              aria-label="Close chat panel"
              tabIndex={0}
              onClick={() => setIsOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsOpen(false);
                }
              }}
              className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-neutral-50/60 dark:bg-neutral-900/40">
            {messages.map((m, i) => (
              <MessageBubble key={i} msg={m} />
            ))}
          </div>
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="flex items-end gap-2">
              <textarea
                aria-label="Type your message"
                tabIndex={0}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask about projects, certifications, or the site..."
                className="w-full resize-none rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-10 max-h-28"
              />
              <button
                type="button"
                aria-label="Send message"
                tabIndex={0}
                disabled={!canSend}
                onClick={() => void handleSend()}
                className={
                  "rounded-md px-3 py-2 text-sm font-medium text-white " +
                  (canSend ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 cursor-not-allowed")
                }
              >
                Send
              </button>
            </div>
          </div>
        </Panel>
        <FloatingButton
          isOpen={isOpen}
          handleClick={handleToggle}
          handleKeyDown={handleButtonKeyDown}
        />
      </div>
    </Container>
  );
};

export default ChatWidget;


