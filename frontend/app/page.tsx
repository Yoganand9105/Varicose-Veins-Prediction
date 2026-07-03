"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ScanUpload, type ScanResult } from "@/components/scan-upload"
import { ResultsCard } from "@/components/results-card"
import { InfoSection } from "@/components/info-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [result, setResult] = useState<ScanResult | null>(null)

  const handleResult = (scanResult: ScanResult) => {
    setResult(scanResult)
  }

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ScanUpload onResult={handleResult} />
        <AnimatePresence>
          {result && <ResultsCard result={result} onReset={handleReset} />}
        </AnimatePresence>
        <InfoSection />
      </main>
      <Footer />
    </div>
  )
}
