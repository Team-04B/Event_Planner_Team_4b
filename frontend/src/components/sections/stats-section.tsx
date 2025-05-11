"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, CreditCard, Star, Users } from "lucide-react"

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    {
      icon: <Calendar className="h-8 w-8 text-black" />,
      value: "10,000+",
      label: "Events Hosted",
      description: "Successful events created on our platform",
    },
    {
      icon: <Users className="h-8 w-8 text-black" />,
      value: "50,000+",
      label: "Active Users",
      description: "Event creators and participants",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-black" />,
      value: "$2M+",
      label: "Payments Processed",
      description: "Secure transactions for paid events",
    },
    {
      icon: <Star className="h-8 w-8 text-black" />,
      value: "99%",
      label: "Satisfaction Rate",
      description: "From event organizers and attendees",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl" ref={ref}>
          <motion.div
            className="grid gap-8 rounded-2xl bg-white p-8 shadow-xl md:grid-cols-2 lg:grid-cols-4 md:p-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  {stat.icon}
                </div>
                <h3 className="mb-2 text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="mb-1 font-medium text-gray-700">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
