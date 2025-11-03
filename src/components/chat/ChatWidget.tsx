"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls, useMotionValue } from "framer-motion";
import { ArrowUp, Maximize2, Minimize2 } from "lucide-react";

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

const SmallChatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <path
      d="M12 4.5c-4.694 0-8.5 3.24-8.5 7.25 0 2.13 1.086 4.02 2.86 5.3l-.66 2.9a.75.75 0 0 0 1.02.86l3.05-1.26c.716.16 1.476.25 2.28.25 4.694 0 8.5-3.24 8.5-7.3 0-4.01-3.806-7.25-8.5-7.25Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Eyes (open state) */}
    <g>
      <rect x="8.9" y="10" width="1.8" height="4.2" rx="0.9" fill="currentColor" />
      <rect x="13.3" y="10" width="1.8" height="4.2" rx="0.9" fill="currentColor" />
    </g>
  </svg>
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

type PanelProps = {
  isOpen: boolean;
  handleClose: () => void;
  messages: ReadonlyArray<ChatMessage>;
  messagesContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  input: string;
  setInput: (v: string) => void;
  canSend: boolean;
  handleSend: () => void | Promise<void>;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const Panel: React.FC<PanelProps> = ({
  isOpen,
  handleClose,
  messages,
  messagesContainerRef,
  input,
  setInput,
  canSend,
  handleSend,
  handleInputKeyDown,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const storageKey = "chat:panel:pos:v1";
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);

  const clampToViewport = useCallback((nx: number, ny: number, w: number, h: number) => {
    const maxX = Math.max(0, window.innerWidth - w);
    const maxY = Math.max(0, window.innerHeight - h);
    const clampedX = Math.min(Math.max(0, nx), maxX);
    const clampedY = Math.min(Math.max(0, ny), maxY);
    return { x: clampedX, y: clampedY };
  }, []);

  const centerPosition = useCallback((w: number, h: number) => {
    const cx = Math.max(0, (window.innerWidth - w) / 2);
    const cy = Math.max(0, (window.innerHeight - h) / 2);
    return { x: Math.round(cx), y: Math.round(cy) };
  }, []);

  // Handle ESC to close
  const escHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  }, [handleClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [isOpen, escHandler]);

  // Initialize position on open (remember last or center)
  useEffect(() => {
    if (!isOpen) return;
    const apply = () => {
      const el = panelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const saved = JSON.parse(raw) as { x: number; y: number };
          const { x: nx, y: ny } = clampToViewport(saved.x, saved.y, rect.width, rect.height);
          x.set(nx);
          y.set(ny);
          return;
        }
      } catch {
        /* ignore malformed storage */
      }
      const { x: cx, y: cy } = centerPosition(rect.width, rect.height);
      x.set(cx);
      y.set(cy);
    };
    // schedule after first paint so rect is measured correctly
    requestAnimationFrame(apply);
  }, [isOpen, clampToViewport, centerPosition, x, y]);

  // Clamp on resize
  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => {
      const el = panelRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = clampToViewport(x.get(), y.get(), rect.width, rect.height);
      x.set(next.x);
      y.set(next.y);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen, clampToViewport, x, y]);

  const handleDragEnd = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = clampToViewport(x.get(), y.get(), rect.width, rect.height);
    x.set(next.x);
    y.set(next.y);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, [clampToViewport, x, y]);

  const handleToggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      // Store current position and expand
      prevPosRef.current = { x: x.get(), y: y.get() };
      x.set(0);
      y.set(0);
      setIsFullscreen(true);
      return;
    }
    // Restore position when exiting fullscreen
    setIsFullscreen(false);
    const prev = prevPosRef.current;
    const el = panelRef.current;
    if (prev && el) {
      const rect = el.getBoundingClientRect();
      const next = clampToViewport(prev.x, prev.y, rect.width, rect.height);
      x.set(next.x);
      y.set(next.y);
    }
  }, [isFullscreen, x, y, clampToViewport]);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="AI chat"
      className={
        "fixed left-0 top-0 z-[60] shadow-xl flex flex-col overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 " +
        (isFullscreen
          ? "w-screen max-w-none h-[100svh] rounded-none"
          : "w-96 max-w-[95vw] h-[28rem] rounded-2xl")
      }
      style={{ x, y, transformOrigin: "bottom right" }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      drag={!isFullscreen}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={handleDragEnd}
    >
      {/* Header (drag handle) */}
      <div
        className={
          "flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5 dark:bg-white/5 select-none " +
          (isFullscreen ? "" : "cursor-grab active:cursor-grabbing")
        }
        onPointerDown={(e) => {
          if (!isFullscreen) dragControls.start(e);
        }}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
          <SmallChatIcon className="h-4 w-4 text-[#9CB7C9]" />
          <span>Ask AI portfolio</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="md:hidden text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            onClick={handleToggleFullscreen}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button
            type="button"
            aria-label="Close chat panel"
            tabIndex={0}
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClose();
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10 bg-white/5 dark:bg-white/5">
        <div className="relative">
          <textarea
            aria-label="Type your message"
            tabIndex={0}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Ask about projects, certifications, or the site..."
            className="w-full resize-none rounded-full bg-transparent border border-white/20 px-4 py-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-[#9CB7C9] placeholder:text-white/40 min-h-12 max-h-28"
          />
          <button
            type="button"
            aria-label="Send message"
            tabIndex={0}
            disabled={!canSend}
            onClick={() => void handleSend()}
            className={
              "absolute right-1.5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-[#9CB7C9] " +
              (canSend
                ? "bg-[#9CB7C9] text-[#1C1C1C] hover:bg-[#8BA5B7]"
                : "bg-white/10 text-white/50 cursor-not-allowed")
            }
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MessageBubble: React.FC<{ msg: ChatMessage }> = ({ msg }) => (
  <div
    className={
      "px-3 py-2 rounded-lg text-sm whitespace-pre-wrap border " +
      (msg.role === "user"
        ? "self-end border-transparent bg-[#9CB7C9] text-white"
        : "self-start border-white/10 bg-white/5 text-neutral-900 dark:text-neutral-100")
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
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const handleButtonKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  const canSend = useMemo(() => {
    const hasText = input.trim().length > 0;
    const inCooldown = cooldownUntil ? Date.now() < cooldownUntil : false;
    return hasText && !isSending && !inCooldown;
  }, [input, isSending, cooldownUntil]);

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
      if (res.status === 429) {
        const resetSec = Number(res.headers.get("X-RateLimit-Reset") ?? "0");
        const resetMs = (resetSec > 0 ? resetSec * 1000 : Date.now() + 15000);
        setCooldownUntil(resetMs);
        const wait = Math.max(0, Math.ceil((resetMs - Date.now()) / 1000));
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: `You’re sending too fast. Please wait ${wait}s.` },
        ]);
        return;
      }
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

  useEffect(() => {
    // Auto-scroll to bottom whenever messages update or panel opens
    const el = messagesContainerRef.current;
    if (!el) return;
    // schedule after layout
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages, isOpen]);

  return (
    <Container>
      <div className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <Panel
              isOpen={isOpen}
              handleClose={() => setIsOpen(false)}
              messages={messages}
              messagesContainerRef={messagesContainerRef}
              input={input}
              setInput={setInput}
              canSend={canSend}
              handleSend={() => void handleSend()}
              handleInputKeyDown={handleInputKeyDown}
            />
          )}
        </AnimatePresence>
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


