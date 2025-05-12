"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="flex h-40 items-center justify-center">
      <motion.div
        className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-black"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}
