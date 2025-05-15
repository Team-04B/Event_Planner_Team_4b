"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutHero() {
  const scrollToNextSection = () => {
    const sections = document.querySelectorAll("section[data-section]")
    if (sections[1]) {
      sections[1].scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section data-section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gray-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gray-200 opacity-20 blur-3xl"></div>
        <div className="absolute left-1/3 top-2/3 h-72 w-72 rounded-full bg-gray-200 opacity-20 blur-3xl"></div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute left-[10%] top-[15%] h-20 w-20 rounded-xl bg-gray-100/50 backdrop-blur-sm"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[15%] h-16 w-16 rounded-full bg-gray-100/50 backdrop-blur-sm"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[20%] h-12 w-12 rounded-lg bg-gray-100/50 backdrop-blur-sm"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-black"></span>
            Redefining Event Experiences
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-black sm:text-6xl md:text-7xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
            Where Moments
            <br />
            Become Memories
          </h1>

          <p className="mb-8 text-xl text-gray-600 md:text-2xl">
            Crafting the future of event planning and participation through
            <br className="hidden md:block" />
            <span className="font-medium text-gray-800"> innovation, connection, and seamless experiences.</span>
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group bg-black text-white hover:bg-gray-800">
              Our Vision
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              Meet The Team
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 1 },
            y: { delay: 1, duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          <button
            onClick={scrollToNextSection}
            className="flex flex-col items-center"
            aria-label="Scroll to next section"
          >
            <span className="mb-2 text-sm font-medium text-gray-500">Discover Our Story</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
              <ChevronRight className="h-5 w-5 rotate-90 text-gray-600" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </section>
  )
}
