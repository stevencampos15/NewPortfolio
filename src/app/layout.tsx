import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
