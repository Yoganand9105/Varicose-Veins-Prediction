"use client"

import { motion } from "framer-motion"
import { ArrowDown, Shield, Zap, Brain, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

function PulseRing() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
          initial={{ width: 100, height: 100, opacity: 0.3 }}
          animate={{
            width: [100 + i * 100, 300 + i * 100],
            height: [100 + i * 100, 300 + i * 100],
            opacity: [0.15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

function FloatingDot({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute size-1.5 rounded-full bg-primary/20"
      style={{ left: x, top: y }}
      animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
      transition={{ duration: 3, repeat: Infinity, delay }}
    />
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-14 md:pb-24 md:pt-20">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 size-[400px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-[350px] rounded-full bg-accent/[0.04] blur-3xl" />
        <PulseRing />
        <FloatingDot x="15%" y="25%" delay={0} />
        <FloatingDot x="80%" y="30%" delay={0.5} />
        <FloatingDot x="25%" y="75%" delay={1} />
        <FloatingDot x="70%" y="80%" delay={1.5} />
        <FloatingDot x="50%" y="15%" delay={2} />
        <FloatingDot x="90%" y="60%" delay={0.8} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.55 0.15 245) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <Brain className="size-3.5" />
              AI-Powered Diagnostics
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            AI Powered Varicose
            <span className="block text-primary">Vein Detection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Upload a leg image and receive instant AI-powered analysis to detect
            possible varicose veins. Fast, accurate, and designed for healthcare
            professionals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="rounded-full px-8" asChild>
              <a href="#scan">
                Start Scanning
                <ArrowDown className="ml-1 size-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
              <a href="#info">Learn More</a>
            </Button>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { icon: Zap, label: "Instant Results", desc: "Analysis in under 5 seconds" },
            { icon: Shield, label: "HIPAA Compliant", desc: "End-to-end encrypted" },
            { icon: Brain, label: "98.5% Accuracy", desc: "Validated deep learning model" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <item.icon className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated ECG line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mx-auto mt-12 flex max-w-xl items-center gap-3"
        >
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="size-4 text-primary" />
            <span className="text-xs font-medium">Ready to analyze</span>
          </div>
          <div className="h-px flex-1 bg-border" />
        </motion.div>
      </div>
    </section>
  )
}
