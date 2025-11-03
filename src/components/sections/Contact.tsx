"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"

// Social media icons component
const SocialIcon = ({ type }: { type: 'github' | 'linkedin' | 'instagram' | 'twitter' }) => {
  switch (type) {
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      )
  }
}

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSending, setIsSending] = useState(false)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState("")
  const [formStartMs] = useState<number>(() => Date.now())
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const widgetContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<any>(null)

  // Load Cloudflare Turnstile script and render widget
  useEffect(() => {
    const render = () => {
      const w: any = typeof window !== 'undefined' ? (window as any) : null
      if (!w?.turnstile || !widgetContainerRef.current || widgetIdRef.current) return
      const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string
      if (!siteKey) return
      widgetIdRef.current = w.turnstile.render(widgetContainerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => setTurnstileToken(token),
        'error-callback': () => setTurnstileToken(null),
        'expired-callback': () => setTurnstileToken(null),
        theme: 'auto',
        size: 'flexible',
      })
    }

    const w: any = typeof window !== 'undefined' ? (window as any) : null
    if (w?.turnstile) {
      render()
      return
    }
    const existing = document.querySelector('script[data-turnstile]') as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', render, { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    // add CSP nonce if present
    const meta = document.querySelector('meta[name="csp-nonce"]') as HTMLMetaElement | null
    const nonce = meta?.content
    if (nonce) script.setAttribute('nonce', nonce)
    script.setAttribute('data-turnstile', '1')
    script.addEventListener('load', render, { once: true })
    document.head.appendChild(script)
  }, [])

  const verifyEmailDeliverability = async (email: string): Promise<boolean> => {
    const trimmed = email.trim()
    if (!trimmed) {
      setEmailError("Email is required.")
      return false
    }
    setIsCheckingEmail(true)
    setEmailError(null)
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = await res.json().catch(() => ({}))
      if (!data?.ok) {
        if (data?.reason === "syntax" || data?.syntaxValid === false) {
          setEmailError("Enter a valid email address.")
        } else if (data?.disposable) {
          setEmailError("Disposable email addresses are not allowed.")
        } else if (data?.mxFound === false) {
          setEmailError("This email domain cannot receive messages.")
        } else {
          setEmailError("Could not verify this email. Please try another.")
        }
        return false
      }
      setEmailError(null)
      return true
    } catch {
      // If verification API fails, do not block the user, but warn
      setEmailError("Could not verify this email at the moment.")
      return false
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSending) return

    // Anti-bot guards (client-side): honeypot + minimum fill time + brief cooldown
    if (honeypot.trim().length > 0) {
      setStatusMsg("Submission blocked.")
      return
    }
    const elapsedMs = Date.now() - formStartMs
    if (elapsedMs < 2500) {
      setStatusMsg("Please take a moment to complete the form and try again.")
      return
    }
    if (cooldownUntil && Date.now() < cooldownUntil) {
      const wait = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000))
      setStatusMsg(`Please wait ${wait}s before sending again.`)
      return
    }

    // Switch to server-side proxy API for sending mail

    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg("Please fill in all fields.")
      return
    }

    const emailOk = await verifyEmailDeliverability(formData.email)
    if (!emailOk) {
      setStatusMsg("Please provide a valid, deliverable email.")
      return
    }

    if (!turnstileToken) {
      setStatusMsg("Please complete the verification challenge.")
      return
    }

    setIsSending(true)
    setStatusMsg(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          turnstileToken,
        }),
      })
      if (res.status === 429) {
        setStatusMsg("You’re sending too fast. Please try again later.")
        return
      }
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) {
        setStatusMsg("Sorry—could not send your message. Please try again.")
        return
      }

      setStatusMsg("Message sent! I’ll get back to you soon.")
      setToastMsg("Message sent! I’ll get back to you soon.")
      setTimeout(() => setToastMsg(null), 3200)
      setFormData({ name: "", email: "", message: "" })
      // start a short cooldown to deter rapid submissions
      setCooldownUntil(Date.now() + 10_000)
      // reset challenge for a new token next submit
      try {
        const w: any = typeof window !== 'undefined' ? (window as any) : null
        if (w?.turnstile && widgetIdRef.current) {
          w.turnstile.reset(widgetIdRef.current)
          setTurnstileToken(null)
        }
      } catch {}
    } catch (err) {
      setStatusMsg("Sorry—could not send your message. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/stevencampos15",
      icon: "github"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/steven-campos15/",
      icon: "linkedin"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/Stevencampos15",
      icon: "instagram"
    },
    {
      name: "Twitter (X)",
      url: "https://twitter.com/Stevencampos15",
      icon: "twitter"
    }
  ]

  return (
    <section id="contact" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="w-full mb-16">
            <motion.div 
              className="relative px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                {t('contact.title')}
              </h2>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-black text-white dark:bg-[#2A2A2A] p-8 rounded-lg shadow border border-[#9CB7C9]/20 hover:border-[#9CB7C9]/40 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-6 text-[#9CB7C9]">{t('contact.info')}</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-2 text-foreground/80 dark:text-gray-300">
                  <span className="text-[#9CB7C9]">📍</span>
                  {t('contact.location')}
                </p>
              </div>
              
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4 text-[#9CB7C9]">{t('contact.followMe')}</h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground/80 dark:text-gray-300 hover:text-[#9CB7C9] transition-colors"
                    >
                      <span className="text-[#9CB7C9]">
                        <SocialIcon type={social.icon as 'github' | 'linkedin' | 'instagram' | 'twitter'} />
                      </span>
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field (hidden from users) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                aria-hidden
                className="hidden"
              />
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80 dark:text-gray-300">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-2 px-4 bg-black text-white dark:bg-[#2A2A2A] border border-[#9CB7C9]/20 focus:border-[#9CB7C9] rounded-lg transition-colors focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80 dark:text-gray-300">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={async () => { if (formData.email) { await verifyEmailDeliverability(formData.email) } }}
                  className={
                    "w-full py-2 px-4 bg-black text-white dark:bg-[#2A2A2A] rounded-lg transition-colors focus:outline-none " +
                    (emailError ? "border border-red-500 focus:border-red-500" : "border border-[#9CB7C9]/20 focus:border-[#9CB7C9]")
                  }
                  required
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-400" role="alert">{emailError}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80 dark:text-gray-300">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full h-32 py-2 px-4 bg-black text-white dark:bg-[#2A2A2A] border border-[#9CB7C9]/20 focus:border-[#9CB7C9] rounded-lg resize-none transition-colors focus:outline-none"
                  required
                />
              </div>
              
              <div ref={widgetContainerRef} className="my-2" />

              <button
                type="submit"
                disabled={isSending || isCheckingEmail}
                aria-disabled={isSending || isCheckingEmail}
                className="w-full px-6 py-3 bg-[#9CB7C9] text-[#1C1C1C] rounded-lg font-medium hover:bg-[#8BA5B7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending…" : (isCheckingEmail ? "Verifying…" : t('contact.form.send'))}
              </button>
              {statusMsg && (
                <p role="status" aria-live="polite" className="text-sm text-foreground/80 dark:text-gray-300">
                  {statusMsg}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            key="contact-toast"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#9CB7C9] text-[#1C1C1C] rounded-md shadow-lg px-4 py-2"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 