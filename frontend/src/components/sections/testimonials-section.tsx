"use client"
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Event Organizer",
    comment:
      "This platform has revolutionized how I manage my events. The payment integration and approval workflows save me hours of manual work.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Michael Wong",
    role: "Conference Host",
    comment:
      "The ability to create both public and private events with different fee structures gives me the flexibility I need for various types of conferences.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Regular Attendee",
    comment:
      "I love how easy it is to discover and join events. The payment process is seamless, and I can see all my upcoming events in one place.",
    rating: 4,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Workshop Facilitator",
    comment:
      "As someone who runs both free community workshops and paid professional training, this platform perfectly accommodates all my needs.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Lisa Nguyen",
    role: "Corporate Event Planner",
    comment:
      "The private event features with approval workflows have made managing corporate events so much more efficient. Highly recommended!",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 to-indigo-900 py-20 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-purple-500 opacity-10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] h-96 w-96 rounded-full bg-indigo-500 opacity-10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Testimonials</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">What Our Users Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-purple-100">
            Join thousands of satisfied users who are creating and discovering amazing events
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-white/5 p-1 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-12"
              >
                <div className="mb-6 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < testimonials[activeIndex].rating ? "fill-yellow-500 text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <p className="mb-8 text-center text-xl italic text-white/90">"{testimonials[activeIndex].comment}"</p>

                <div className="flex flex-col items-center">
                  <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-white/20">
                    <Image
                      src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-semibold">{testimonials[activeIndex].name}</h4>
                  <p className="text-purple-200">{testimonials[activeIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <motion.button
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setAutoplay(false)
                }}
                className={`h-2 w-8 rounded-full transition-all ${activeIndex === index ? "bg-white" : "bg-white/30"}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
