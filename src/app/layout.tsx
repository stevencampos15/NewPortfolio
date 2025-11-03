import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Steven Campos - Portfolio",
  description: "Cybersecurity Specialist Portfolio - Steven Campos",
  icons: {
    icon: "/images/SC-Logo.ico",
    shortcut: "/images/SC-Logo.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const hdrs = await headers();
  const nonce = hdrs.get("x-nonce") || hdrs.get("x-csp-nonce") || undefined;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {nonce ? <meta name="csp-nonce" content={nonce} /> : null}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Navigation />
            <LanguageToggle />
            <ThemeToggle />
            {children}
              <ChatWidget />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
