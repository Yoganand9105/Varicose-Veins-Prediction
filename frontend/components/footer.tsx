"use client"

import { Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative flex size-8 items-center justify-center rounded-lg bg-primary">
            <Activity className="size-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              VeinScan AI
            </span>
            <span className="text-[10px] text-muted-foreground">Medical Imaging Platform</span>
          </div>
        </div>
        <p className="max-w-sm text-center text-xs leading-relaxed text-muted-foreground">
          For informational and research purposes only. This tool does not provide medical
          diagnoses. Always consult a licensed healthcare professional.
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} VeinScan AI
        </p>
      </div>
    </footer>
  )
}
