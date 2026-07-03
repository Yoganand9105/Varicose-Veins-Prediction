"use client"

import { motion } from "framer-motion"
import { Activity, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border/40 bg-card/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="relative flex size-9 items-center justify-center rounded-xl bg-primary">
            <Activity className="size-5 text-primary-foreground" />
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-xl bg-primary/30 blur-md" />
          </div>
          <div className="flex flex-col">
            <span
              className="text-base font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              VeinScan AI
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Medical Imaging
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {[
            { href: "#scan", label: "AI Scan" },
            { href: "#results", label: "Results" },
            { href: "#info", label: "Learn More" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button size="sm" className="rounded-full px-5">
            Get Started
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border/40 bg-card px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {[
              { href: "#scan", label: "AI Scan" },
              { href: "#results", label: "Results" },
              { href: "#info", label: "Learn More" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="mt-2 w-full rounded-full">
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
