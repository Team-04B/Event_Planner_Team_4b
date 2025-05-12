"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What types of events can I create on the platform?",
    answer:
      "You can create four types of events: Public Free (open to all with instant access), Public Paid (open to all with payment required), Private Free (invitation or approval required), and Private Paid (invitation or approval required with payment).",
  },
  {
    question: "How do payments work for paid events?",
    answer:
      "Our platform integrates secure payment processing. When you create a paid event, participants will complete payment during registration. For public paid events, they'll be automatically approved after payment. For private paid events, they'll still need your approval after payment.",
  },
  {
    question: "Can I invite specific people to my events?",
    answer:
      "Yes! You can send direct invitations to registered users. For paid events, invitees will see a Pay & Accept button. Upon payment, their membership enters a Pending state until you approve them.",
  },
  {
    question: "How do I manage participants for my events?",
    answer:
      "As an event creator, you have full control over your participant list. You can approve or reject join requests, ban participants if needed, and send direct invitations to specific users.",
  },
  {
    question: "Is there a fee for using the platform?",
    answer:
      "The platform is free to use for creating and joining free events. For paid events, we charge a small service fee on each transaction to cover payment processing and platform maintenance.",
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-black text-white">FAQ</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find answers to common questions about our event platform
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={cn(
                  "overflow-hidden rounded-xl border border-gray-200 bg-white transition-all",
                  openIndex === index ? "shadow-md" : "",
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  className="flex w-full items-center justify-between p-6 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
