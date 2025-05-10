"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { StepIndicator } from "@/components/ui/step-indicator"

export default function EventTypesSection() {
  const [activeTab, setActiveTab] = useState("public-free")

  const eventTypes = [
    {
      id: "public-free",
      title: "Public Free Events",
      description:
        "Open to everyone with instant access. Perfect for community gatherings, meetups, and public workshops.",
      color: "green",
      features: ["Visible to all users", "One-click registration", "No payment required", "Instant approval"],
      image: "/placeholder.svg?height=400&width=600",
      example: "Community Workshop",
    },
    {
      id: "public-paid",
      title: "Public Paid Events",
      description:
        "Open to everyone with payment required. Ideal for conferences, premium workshops, and ticketed performances.",
      color: "blue",
      features: [
        "Visible to all users",
        "Integrated payment processing",
        "Secure transaction handling",
        "Approval after payment",
      ],
      image: "/placeholder.svg?height=400&width=600",
      example: "Industry Conference",
    },
    {
      id: "private-free",
      title: "Private Free Events",
      description:
        "Invitation or approval required, but no payment needed. Perfect for team meetings, private gatherings, and exclusive communities.",
      color: "amber",
      features: [
        "Visible to logged-in users",
        "Request to join required",
        "Host approval needed",
        "Direct invitations available",
      ],
      image: "/placeholder.svg?height=400&width=600",
      example: "Team Retreat",
    },
    {
      id: "private-paid",
      title: "Private Paid Events",
      description:
        "Invitation or approval required with payment. Ideal for exclusive workshops, premium masterclasses, and VIP experiences.",
      color: "purple",
      features: [
        "Visible to logged-in users",
        "Request and payment required",
        "Two-step verification",
        "Premium experience management",
      ],
      image: "/placeholder.svg?height=400&width=600",
      example: "Executive Masterclass",
    },
  ]

  const getColorClass = (color: string, type: "bg" | "text" | "hover-bg") => {
    const colorMap = {
      green: {
        bg: "bg-green-100",
        text: "text-green-800",
        "hover-bg": "hover:bg-green-200",
      },
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        "hover-bg": "hover:bg-blue-200",
      },
      amber: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        "hover-bg": "hover:bg-amber-200",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        "hover-bg": "hover:bg-purple-200",
      },
    }

    return colorMap[color as keyof typeof colorMap][type]
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
          <Badge className="mb-4 bg-purple-100 text-purple-800">Event Types</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Find Your Perfect Event Format
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our platform supports various event types to match your specific needs
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="public-free" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="relative mb-8 flex justify-center">
              <TabsList className="grid w-full max-w-2xl grid-cols-2 md:grid-cols-4">
                {eventTypes.map((type) => (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    className={`data-[state=active]:${getColorClass(type.color, "bg")} data-[state=active]:${getColorClass(
                      type.color,
                      "text",
                    )}`}
                  >
                    {type.title.split(" ")[0]} {type.title.split(" ")[1]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="relative">
              {/* Step indicator */}
              <div className="absolute -left-16 top-1/2 hidden -translate-y-1/2 transform md:block">
                {/* <StepIndicator
                  steps={4}
                  currentStep={eventTypes.findIndex((type) => type.id === activeTab)}
                  orientation="vertical"
                /> */}
              </div>

              <motion.div
                className="rounded-xl border bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {eventTypes.map((type) => (
                  <TabsContent key={type.id} value={type.id} className="mt-0">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="mb-4 text-xl font-semibold">{type.title}</h3>
                        <p className="mb-4 text-gray-600">{type.description}</p>
                        <ul className="space-y-2">
                          {type.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <CheckCircle className={`mr-2 h-5 w-5 ${getColorClass(type.color, "text")}`} />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <Button
                          className={`mt-6 ${getColorClass(type.color, "bg")} ${getColorClass(
                            type.color,
                            "text",
                          )} ${getColorClass(type.color, "hover-bg")}`}
                          asChild
                        >
                          <Link href={`/events?type=${type.id}`}>Browse {type.title}</Link>
                        </Button>
                      </div>
                      <div className="relative hidden overflow-hidden rounded-xl md:block">
                        <Image
                          src={type.image || "/placeholder.svg"}
                          alt={type.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <Badge
                            className={`${getColorClass(type.color, "bg")} ${getColorClass(
                              type.color,
                              "text",
                            )} ${getColorClass(type.color, "hover-bg")}`}
                          >
                            {type.title.split(" ")[0]} {type.title.split(" ")[1]}
                          </Badge>
                          <h4 className="mt-2 text-xl font-semibold text-white">{type.example}</h4>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </motion.div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
