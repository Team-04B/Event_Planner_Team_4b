"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real app, you would send this to your API
      console.log("Subscribing email:", email)
      setIsSubmitted(true)
      setEmail("")

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 text-white md:p-12">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Stay Updated</h2>
              <p className="mb-6">
                Subscribe to our newsletter to receive the latest updates on new features, upcoming events, and
                exclusive offers.
              </p>

              {isSubmitted ? (
                <motion.div
                  className="flex items-center space-x-2 text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Thank you for subscribing!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-white text-purple-600 hover:bg-white/90" size="lg">
                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
            <div className="hidden bg-white/10 p-12 backdrop-blur-sm md:block">
              <div className="relative h-full">
                <div className="absolute left-0 top-0 h-16 w-16 rounded-full bg-white/10"></div>
                <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/10"></div>
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/20"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
