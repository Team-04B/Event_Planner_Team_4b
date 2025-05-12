"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  steps: number
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

export function StepIndicator({ steps, currentStep, orientation = "horizontal" }: StepIndicatorProps) {
  return (
    <div className={cn("flex", orientation === "horizontal" ? "flex-row space-x-2" : "flex-col space-y-4")}>
      {Array.from({ length: steps }).map((_, index) => (
        <div key={index} className={cn("relative", orientation === "horizontal" ? "h-2 w-2" : "h-4 w-4")}>
          <motion.div
            className={cn(
              "absolute rounded-full",
              orientation === "horizontal" ? "h-2 w-2" : "h-4 w-4",
              index === currentStep ? "bg-black" : "bg-gray-300",
            )}
            animate={{
              scale: index === currentStep ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: index === currentStep ? Number.POSITIVE_INFINITY : 0,
              repeatType: "reverse",
            }}
          />
        </div>
      ))}
    </div>
  )
}
