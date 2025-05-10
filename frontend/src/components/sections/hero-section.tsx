"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 py-20 md:py-28">
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

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Discover • Connect • Experience</Badge>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Where Memorable Events{" "}
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 bg-clip-text text-transparent">
                Come to Life
              </span>
            </h1>
            <p className="mb-8 text-xl text-purple-100 md:text-2xl">
              Create, discover, and join events that matter to you. <br className="hidden md:block" />
              Your all-in-one platform for meaningful connections.
            </p>

            <div className="mx-auto mb-10 max-w-3xl rounded-xl bg-white/10 p-2 backdrop-blur-sm md:p-3">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for events..."
                    className="h-12 border-0 bg-white pl-10 text-gray-900 shadow-sm md:h-14"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" className="h-12 bg-purple-600 text-white hover:bg-purple-700 md:h-14">
                  Find Events
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group bg-white text-purple-800 hover:bg-gray-100" asChild>
                <Link href="/create-event">
                  Create an Event
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/events">
                  Explore Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Event platform preview"
                width={600}
                height={800}
                className="h-auto w-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-md">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge className="bg-green-500 text-white hover:bg-green-600">Live Now</Badge>
                    <div className="flex items-center text-white">
                      <Users className="mr-1 h-4 w-4" />
                      <span className="text-sm">1.2k attending</span>
                    </div>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-white">Global Innovation Summit</h3>
                  <div className="flex items-center text-white/80">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span className="text-sm">Today, 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification elements */}
            <motion.div
              className="absolute -right-6 -top-6 rounded-lg bg-white p-3 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Just Approved</p>
                  <p className="text-sm font-semibold">Your Registration</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 rounded-lg bg-white p-3 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">New Invitation</p>
                  <p className="text-sm font-semibold">Tech Meetup</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Events Created", value: "10K+" },
            { label: "Active Users", value: "50K+" },
            { label: "Countries", value: "100+" },
            { label: "Satisfaction", value: "99%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
