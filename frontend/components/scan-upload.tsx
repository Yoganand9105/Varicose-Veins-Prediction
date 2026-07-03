"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Image as ImageIcon,
  X,
  ScanLine,
  Cpu,
  Eye,
  Layers,
  Crosshair,
  CircleDot,
} from "lucide-react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export type ScanResult = {
  diagnosis: "normal" | "varicose"
  confidence: number
  risk: "Low" | "Medium" | "High"
}

interface ScanUploadProps {
  onResult: (result: ScanResult) => void
}

function ScanningOverlay({ progress }: { progress: number }) {
  const [activeLayer, setActiveLayer] = useState(0)

  const layers = [
    "Initializing neural network...",
    "Extracting vascular features...",
    "Analyzing vein topology...",
    "Computing risk assessment...",
    "Generating diagnosis...",
  ]

  useEffect(() => {
    const idx = Math.min(Math.floor(progress / 20), layers.length - 1)
    setActiveLayer(idx)
  }, [progress])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10"
    >
      <div className="absolute inset-0 bg-foreground/70 backdrop-blur-[2px]" />

      <motion.div
        className="absolute left-0 right-0 z-20 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.55 0.15 245 / 0.3) 20%, oklch(0.55 0.15 245) 50%, oklch(0.55 0.15 245 / 0.3) 80%, transparent 100%)",
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 top-0 z-20 w-[2px]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.62 0.19 170 / 0.3) 20%, oklch(0.62 0.19 170) 50%, oklch(0.62 0.19 170 / 0.3) 80%, transparent 100%)",
        }}
        animate={{ left: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="absolute bottom-4 left-4 z-30 rounded-lg border border-primary/20 bg-foreground/80 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Cpu className="size-3 text-primary" />
          <span className="font-mono text-[10px] text-primary">
            {Math.round(progress)}% COMPLETE
          </span>
        </div>
        <span className="font-mono text-[10px] text-primary/80">
          {layers[activeLayer]}
        </span>
      </div>
    </motion.div>
  )
}

export function ScanUpload({ onResult }: ScanUploadProps) {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const [heatmap, setHeatmap] = useState<string | null>(null)
  const [showHeatmap, setShowHeatmap] = useState(true)

  const [isDragging, setIsDragging] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return

    setFile(f)

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
    }

    reader.readAsDataURL(f)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) handleFile(droppedFile)
    },
    [handleFile]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const clearImage = () => {
    setImage(null)
    setFile(null)
    setHeatmap(null)
    setScanProgress(0)
  }

  const handleScan = async () => {
    if (!file) return

    setIsScanning(true)
    setScanProgress(0)

    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 8
      })
    }, 250)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) throw new Error("API request failed")

      const data = await response.json()

      if (data.heatmap) {
        setHeatmap(`data:image/jpeg;base64,${data.heatmap}`)
      }

      const isVaricose =
        data.diagnosis?.toLowerCase().includes("varicose")

      const confidence = Math.round(
        (data.prediction_score ?? 0.85) * 100
      )

      setScanProgress(100)

      setTimeout(() => {
        setIsScanning(false)

        onResult({
          diagnosis: isVaricose ? "varicose" : "normal",
          confidence,
          risk: isVaricose
            ? confidence > 80
              ? "High"
              : "Medium"
            : "Low",
        })
      }, 800)
    } catch (err) {
      console.error(err)
      setIsScanning(false)
      alert("Prediction failed. Make sure backend is running.")
    }
  }

  return (
    <section id="scan" className="px-6 pb-16">
      <div className="mx-auto max-w-3xl">

        <Card className="overflow-hidden border-border/60 shadow-xl shadow-primary/5">

          <div className="flex items-center justify-between border-b border-border/40 bg-secondary/40 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <ScanLine className="size-5 text-primary" />
              </div>

              <div>
                <h2 className="text-base font-semibold">
                  AI Vein Scanner
                </h2>
                <p className="text-xs text-muted-foreground">
                  Upload a clear leg image
                </p>
              </div>
            </div>

            <span className="text-xs text-accent">
              Model Ready
            </span>
          </div>

          <CardContent className="p-6">

            {!image && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed p-14"
              >
                <Upload className="size-9 text-primary" />

                <p className="text-sm font-semibold">
                  Drop image or browse
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if (selectedFile) handleFile(selectedFile)
                  }}
                />
              </div>
            )}

            {image && (
              <div className="space-y-5">

                <div className="relative overflow-hidden rounded-2xl border">

                  <img
                    src={image}
                    className="aspect-[4/3] w-full object-cover"
                  />

                  {heatmap && showHeatmap && !isScanning && (
                    <img
                      src={heatmap}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                    />
                  )}

                  {!isScanning && (
                    <button
                      onClick={clearImage}
                      className="absolute right-3 top-3"
                    >
                      <X />
                    </button>
                  )}

                  <AnimatePresence>
                    {isScanning && (
                      <ScanningOverlay progress={scanProgress} />
                    )}
                  </AnimatePresence>

                </div>

                {!isScanning && (
                  <Button
                    onClick={handleScan}
                    className="w-full"
                  >
                    <ScanLine className="mr-2 size-5" />
                    Begin AI Scan
                  </Button>
                )}

                {heatmap && !isScanning && (
                  <Button
                    variant="outline"
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className="w-full"
                  >
                    {showHeatmap
                      ? "Hide AI Heatmap"
                      : "Show AI Heatmap"}
                  </Button>
                )}

              </div>
            )}

          </CardContent>

        </Card>

      </div>
    </section>
  )
}