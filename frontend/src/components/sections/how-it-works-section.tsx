"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, CheckCircle, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      title: "Create & Customize",
      description:
        "Create public or private events with optional registration fees. Customize every aspect of your event.",
      icon: <Calendar className="h-8 w-8 text-white" />,
      color: "bg-purple-600",
      steps: ["Set event visibility (public/private)", "Add optional registration fee", "Customize event details"],
    },
    {
      title: "Discover & Join",
      description: "Browse upcoming events, filter by your interests, and join with just a few clicks.",
      icon: <Search className="h-8 w-8 text-white" />,
      color: "bg-pink-600",
      steps: ["Browse events by category", "Request access to private events", "Complete payment for paid events"],
    },
    {
      title: "Manage & Connect",
      description: "Approve participants, send invitations, and build your community around shared interests.",
      icon: <Users className="h-8 w-8 text-white" />,
      color: "bg-indigo-600",
      steps: ["Approve or reject requests", "Send direct invitations", "Engage with participants"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-purple-100 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800">Simple Process</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our platform makes it easy to create, discover, and participate in events that matter to you
          </p>
        </motion.div>

        <div className="relative" ref={ref}>
          {/* Connection line */}
          <div className="absolute left-1/2 top-24 hidden h-[calc(100%-120px)] w-1 -translate-x-1/2 bg-gray-200 md:block"></div>

          <motion.div
            className="grid gap-12 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <motion.div key={index} className="relative" variants={itemVariants}>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-full ${step.color}`}
                  >
                    {step.icon}
                    <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-900 shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mb-6 text-gray-600">{step.description}</p>
                  <ul className="space-y-3 text-left">
                    {step.steps.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      >
                        <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-purple-500" />
                        <span className="text-gray-600">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Get Started Now
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
