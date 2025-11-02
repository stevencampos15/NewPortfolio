# Portfolio Site

This site showcases Steven Campos’ work with a bilingual, dark‑first design and an AI assistant that answers from a private knowledge base.

## Tech Stack
- Framework: Next.js 15 (App Router), React 19, TypeScript
- UI: TailwindCSS (accent `#9CB7C9`, hover `#8BA5B7`), `tailwindcss-animate`, Inter font
- Theming: `next-themes` (default dark, system support)
- i18n: custom `LanguageProvider` with language toggle (EN/ES)

## Layout & Global Components
- Root layout injects providers and shared UI:
  - Navigation (`Navigation`)
  - Language switch (`LanguageToggle`)
  - Theme switch (`ThemeToggle`)
  - Floating chat (`ChatWidget`)

## AI Chat (RAG Assistant)
- API: `POST /api/chat` streams responses using OpenAI Chat Completions
- Retrieval: Pinecone vector search over Markdown in `src/knowledge/`
  - Embeddings: OpenAI `text-embedding-3-small` (1536 dims)
  - Retrieval config: `TOP_K = 12`, `MIN_SCORE = 0.6` (fallback to best few if none pass)
  - Prompting: system lists source filenames and headings; context block instructs “use ONLY the following context”
- Rate limits (server): Upstash Redis Ratelimit
  - Limits: 10 requests/minute/IP and 200 requests/day/IP
  - 429 headers: `X-RateLimit-Remaining`, `X-RateLimit-Reset` (epoch seconds), `Retry-After`
  - Client UX: disables send and shows a friendly countdown message when limited
- Chat UI:
  - Floating neon icon with smooth animation (eyes open/left/right, blink, question mark)
  - Glassmorphism panel, auto‑scroll to bottom, keyboard accessible
  - User bubbles: solid accent background with white text

## Design Notes
- Accent color family: `#9CB7C9` (hover `#8BA5B7`) used for CTAs, focus rings, and chat icon
- Motion: subtle framer‑motion fades/slides; animated chat icon; smooth crossfades in icon states
- Accessibility: focus rings on controls, keyboard handlers on toggles/buttons


