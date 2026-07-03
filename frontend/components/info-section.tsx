"use client"

import { motion } from "framer-motion"
import {
  HeartPulse,
  Footprints,
  Droplets,
  ShieldCheck,
  Stethoscope,
  Activity,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const symptoms = [
  {
    icon: HeartPulse,
    title: "Bulging Veins",
    description:
      "Twisted, swollen veins visible just under the skin surface, often appearing blue or dark purple.",
  },
  {
    icon: Footprints,
    title: "Leg Pain & Heaviness",
    description:
      "Aching, throbbing, or cramping pain in the legs, especially after prolonged standing.",
  },
  {
    icon: Droplets,
    title: "Swelling & Discoloration",
    description:
      "Swelling in the lower legs and ankles, with skin color changes around the affected veins.",
  },
]

const tips = [
  {
    icon: Activity,
    title: "Regular Exercise",
    description:
      "Walking, cycling, and swimming improve circulation and strengthen leg muscles.",
  },
  {
    icon: ShieldCheck,
    title: "Compression Stockings",
    description:
      "Medical-grade stockings help veins move blood efficiently, reducing swelling.",
  },
  {
    icon: Stethoscope,
    title: "Medical Consultation",
    description:
      "Early detection and treatment prevent complications. Consult a vascular specialist.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function InfoSection() {
  return (
    <section id="info" className="scroll-mt-20 px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <HeartPulse className="size-3.5" />
            Health Information
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Understanding Varicose Veins
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Varicose veins are enlarged, twisted veins that usually occur in the legs.
            Understanding the symptoms and prevention methods can help you take early action.
          </p>
        </motion.div>

        {/* Symptoms */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <h3
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Common Symptoms
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {symptoms.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <Card className="group h-full border-border/60 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                      <item.icon className="size-6 text-primary" />
                    </div>
                    <h4
                      className="mb-2 text-base font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Prevention */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <h3
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Prevention & Care
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {tips.map((item) => (
              <motion.div key={item.title} variants={itemVariants}>
                <Card className="group h-full border-border/60 transition-all hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/10 transition-colors group-hover:bg-accent/15">
                      <item.icon className="size-6 text-accent" />
                    </div>
                    <h4
                      className="mb-2 text-base font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
