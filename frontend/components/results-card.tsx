"use client"

import { motion } from "framer-motion"
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileText,
  RotateCcw,
  ShieldCheck,
  Activity,
  Clock,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ScanResult } from "@/components/scan-upload"

interface ResultsCardProps {
  result: ScanResult
  onReset: () => void
}

export function ResultsCard({ result, onReset }: ResultsCardProps) {
  const isVaricose = result.diagnosis === "varicose"

  const riskConfig = {
    Low: {
      bg: "bg-accent/10",
      text: "text-accent",
      border: "border-accent/20",
      label: "Low Risk",
      advice: "No immediate action required. Maintain healthy habits.",
    },
    Medium: {
      bg: "bg-chart-4/10",
      text: "text-chart-4",
      border: "border-chart-4/20",
      label: "Medium Risk",
      advice: "Monitor symptoms and schedule a specialist consultation.",
    },
    High: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      border: "border-destructive/20",
      label: "High Risk",
      advice: "Seek consultation with a vascular specialist promptly.",
    },
  }

  const risk = riskConfig[result.risk]
  const now = new Date()
  const timestamp = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <section id="results" className="scroll-mt-20 px-6 pb-16">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Card className="overflow-hidden border-border/60 shadow-xl shadow-primary/5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 bg-secondary/40 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="size-5 text-primary" />
                </div>
                <div>
                  <h2
                    className="text-base font-semibold text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Analysis Report
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {timestamp}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                <ShieldCheck className="size-3.5 text-primary" />
                <span className="text-[11px] font-medium text-primary">Verified</span>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-5">
                {/* Primary diagnosis banner */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex items-center gap-4 rounded-2xl border-2 p-6 ${
                    isVaricose
                      ? "border-destructive/20 bg-destructive/5"
                      : "border-accent/20 bg-accent/5"
                  }`}
                >
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${
                      isVaricose ? "bg-destructive/10" : "bg-accent/10"
                    }`}
                  >
                    {isVaricose ? (
                      <AlertTriangle className="size-7 text-destructive" />
                    ) : (
                      <CheckCircle2 className="size-7 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Primary Diagnosis
                    </p>
                    <p
                      className={`mt-1 text-xl font-bold ${
                        isVaricose ? "text-destructive" : "text-accent"
                      }`}
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {isVaricose ? "Varicose Veins Detected" : "Normal - No Varicose Veins"}
                    </p>
                  </div>
                </motion.div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Confidence */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-border/60 p-5"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 text-primary" />
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        Confidence
                      </p>
                    </div>
                    <div className="mt-3 flex items-end gap-0.5">
                      <span
                        className="text-3xl font-bold text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {result.confidence}
                      </span>
                      <span className="mb-1 text-base font-medium text-muted-foreground">%</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </motion.div>

                  {/* Risk Level */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-border/60 p-5"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      Risk Level
                    </p>
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold ${risk.bg} ${risk.text} ${risk.border}`}
                      >
                        {risk.label}
                      </span>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                      {risk.advice}
                    </p>
                  </motion.div>

                  {/* Model info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-border/60 p-5"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="size-4 text-accent" />
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        Model
                      </p>
                    </div>
                    <p
                      className="mt-3 text-sm font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      VeinNet v2.4
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Deep CNN Classifier
                    </p>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Accuracy: 98.5%
                    </p>
                  </motion.div>
                </div>

                {/* Disclaimer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl border border-border/40 bg-secondary/40 px-5 py-4"
                >
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Medical Disclaimer:</span>{" "}
                    This AI analysis is for informational purposes only and does not constitute
                    a medical diagnosis. Always consult a qualified healthcare provider for
                    proper evaluation and treatment decisions.
                  </p>
                </motion.div>

                <Button onClick={onReset} variant="outline" size="lg" className="w-full rounded-xl">
                  <RotateCcw className="mr-2 size-4" />
                  Scan Another Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
