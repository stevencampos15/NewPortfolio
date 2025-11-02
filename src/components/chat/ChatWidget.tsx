"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type IconPhase = "eyes-open" | "eyes-left" | "eyes-right" | "eyes-closed" | "question";

const ICON_SEQUENCE: ReadonlyArray<{ phase: IconPhase; durationMs: number }> = [
  { phase: "eyes-open", durationMs: 1400 },
  { phase: "eyes-right", durationMs: 420 },
  { phase: "eyes-left", durationMs: 520 },
  { phase: "eyes-open", durationMs: 600 },
  { phase: "eyes-closed", durationMs: 140 },
  { phase: "eyes-open", durationMs: 260 },
  { phase: "question", durationMs: 1400 },
  { phase: "eyes-open", durationMs: 1600 },
];

const INITIAL_ASSISTANT_MESSAGE =
  "Hi! I’m your portfolio assistant. Ask me about Steven’s projects, experience, or this website.";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed bottom-4 right-4 z-50">{children}</div>
);

const FloatingButton: React.FC<{
  isOpen: boolean;
  handleClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}> = ({ isOpen, handleClick, handleKeyDown }) => {
  const [iconPhase, setIconPhase] = useState<IconPhase>("eyes-open");
  const [sequenceIndex, setSequenceIndex] = useState(0);

  useEffect(() => {
    if (isOpen) return; // pause animation when panel is open

    const current = ICON_SEQUENCE[sequenceIndex];
    setIconPhase(current.phase);

    const timeoutId = window.setTimeout(() => {
      setSequenceIndex((idx) => (idx + 1) % ICON_SEQUENCE.length);
    }, current.durationMs);

    return () => window.clearTimeout(timeoutId);
  }, [sequenceIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      // reset when closing the panel
      setIconPhase("eyes-open");
      setSequenceIndex(0);
    }
  }, [isOpen]);

  const eyeOffset = iconPhase === "eyes-left" ? -1.2 : iconPhase === "eyes-right" ? 1.2 : 0;

  return (
    <button
      type="button"
      aria-label={isOpen ? "Close chat" : "Open chat"}
      aria-pressed={isOpen}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="relative h-12 w-12 rounded-full flex items-center justify-center text-[#9CB7C9] transition
                 focus:outline-none focus:ring-2 focus:ring-[#9CB7C9] focus:ring-offset-2 focus:ring-offset-transparent
                 hover:text-[#8BA5B7]
                 shadow-[0_0_12px_rgba(156,183,201,0.70),0_0_24px_rgba(156,183,201,0.35)]
                 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[rgba(156,183,201,0.12)] before:blur-lg before:pointer-events-none"
    >
      <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M6 6L18 18" />
          <path d="M18 6L6 18" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          aria-hidden
        >
          {/* Outer neon chat-bubble ring */}
          <path
            d="M12 4.5c-4.694 0-8.5 3.24-8.5 7.25 0 2.13 1.086 4.02 2.86 5.3l-.66 2.9a.75.75 0 0 0 1.02.86l3.05-1.26c.716.16 1.476.25 2.28.25 4.694 0 8.5-3.24 8.5-7.3 0-4.01-3.806-7.25-8.5-7.25Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <AnimatePresence mode="wait" initial={false}>
            {iconPhase === "question" ? (
              <motion.g
                key="q"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {/* Question mark curve draws in */}
                <motion.path
                  d="M9.5 9.5a2.5 2.5 0 1 1 5 0c0 1.3-1 1.8-2 2.3-.8.4-1.3.9-1.3 1.7v.7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                />
                {/* Question mark dot pops in */}
                <motion.circle
                  cx="12"
                  cy="16.8"
                  r="0.9"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.2 }}
                />
              </motion.g>
            ) : iconPhase === "eyes-closed" ? (
              <motion.g
                key="eyes-closed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {/* Closed eyes */}
                <rect x="8.6" y="12.1" width="2.2" height="0.9" rx="0.45" fill="currentColor" />
                <rect x="13.2" y="12.1" width="2.2" height="0.9" rx="0.45" fill="currentColor" />
              </motion.g>
            ) : (
              <motion.g
                key="eyes-open"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {/* Open eyes that glance left/right by translating the group */}
                <motion.g animate={{ x: eyeOffset }} transition={{ type: "spring", stiffness: 340, damping: 22 }}>
                  <rect x="8.9" y="10" width="1.8" height="4.2" rx="0.9" fill="currentColor" />
                  <rect x="13.3" y="10" width="1.8" height="4.2" rx="0.9" fill="currentColor" />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      )}
    </button>
  );
};

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


