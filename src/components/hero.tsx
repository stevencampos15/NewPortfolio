import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-24 md:px-6">
      <div className="container flex max-w-4xl flex-col items-center gap-4 text-center">
        <h1 className="animate-fade-up text-[0.5rem] font-bold tracking-tighter sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl/none">
          Hello, I&apos;m{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Steven Campos
          </span>
        </h1>
        <p className="animate-fade-up text-muted-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          A passionate professional with expertise in building innovative solutions and driving results
        </p>
        <div className="mt-6 flex animate-fade-up flex-col gap-2 min-[400px]:flex-row">
          <Button asChild size="lg">
            <Link href="#contact">Contact Me</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#timeline">
              View My Experience
              <ArrowDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}

