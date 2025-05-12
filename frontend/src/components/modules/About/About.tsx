"use client"
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sectionRefs.forEach((ref, index) => {
        if (!ref.current) return

        const element = ref.current as HTMLElement
        const offsetTop = element.offsetTop
        const height = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Fixed navigation dots */}
      <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 transform md:block">
        <div className="flex flex-col items-center space-y-4">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => {
                if (sectionRefs[index].current) {
                  ;(sectionRefs[index].current as HTMLElement).scrollIntoView({
                    behavior: "smooth",
                  })
                }
              }}
              className={cn(
                "h-3 w-3 rounded-full transition-all duration-300",
                activeSection === index ? "bg-black scale-125" : "bg-gray-300 hover:bg-gray-400",
              )}
              aria-label={`Navigate to section ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section ref={sectionRefs[0]} className="relative flex min-h-screen items-center justify-center overflow-hidden">
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
              onClick={() => {
                if (sectionRefs[1].current) {
                  ;(sectionRefs[1].current as HTMLElement).scrollIntoView({
                    behavior: "smooth",
                  })
                }
              }}
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

      {/* Our Story Section */}
      <section ref={sectionRefs[1]} className="relative py-24 md:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full border border-gray-100 opacity-50"></div>
          <div className="absolute -left-16 top-16 h-[400px] w-[400px] rounded-full border border-gray-100 opacity-50"></div>
          <div className="absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full border border-gray-100 opacity-50"></div>
          <div className="absolute -right-16 bottom-16 h-[400px] w-[400px] rounded-full border border-gray-100 opacity-50"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 flex items-center justify-center">
              <div className="h-px w-12 bg-gray-300"></div>
              <h2 className="mx-4 text-center text-lg font-medium uppercase tracking-widest text-gray-600">
                Our Journey
              </h2>
              <div className="h-px w-12 bg-gray-300"></div>
            </div>

            <div className="grid gap-16 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="relative h-full overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-500/10"></div>
                  <div className="relative aspect-[3/4] h-full w-full">
                    <Image
                      src="/images/born.jpg?height=800&width=600"
                      alt="Our journey visualization"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-1 rounded-full bg-white"></div>
                      <div className="h-1 w-12 rounded-full bg-white"></div>
                    </div>
                    <p className="mt-4 text-sm font-medium uppercase tracking-wider text-white">Est. 2023</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center md:col-span-7">
                <h3 className="mb-6 text-4xl font-bold tracking-tight">A Vision Born from Necessity</h3>

                <div className="space-y-6 text-lg text-gray-600">
                  <p>
                    <span className="font-semibold text-gray-900">In a world of disconnected event solutions,</span> we
                    envisioned a platform that would seamlessly unite creators and participants under one intuitive
                    ecosystem.
                  </p>

                  <p>
                    Our journey began when a team of event enthusiasts—frustrated by fragmented tools and opaque
                    processes—decided to build the platform they wished existed. What started as a solution to our own
                    challenges quickly evolved into a mission to transform the entire event landscape.
                  </p>

                  <p>
                    Today, we&apos;re proud to offer a comprehensive platform that handles everything from event
                    creation and discovery to participation management and payment processing—all while maintaining the
                    human connection that makes events special.
                  </p>

                  <div className="pt-4">
                    <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                      <span className="mr-2">Our core belief:</span>
                      <span className="font-semibold">Technology should enhance human connection, not replace it.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Approach */}
      <section ref={sectionRefs[2]} className="relative bg-gradient-to-b from-white to-gray-50 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
              <Star className="mr-2 h-4 w-4" />
              Our Philosophy
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              Guided by Purpose, <br />
              <span className="text-black">Driven by Excellence</span>
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              We&apos;ve built our platform around core principles that guide every feature, interaction, and
              experience.
            </p>
          </div>

          <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-3">
            {[
              {
                icon: <Globe className="h-8 w-8 text-gray-500" />,
                title: "Inclusive by Design",
                description:
                  "We believe events should be accessible to everyone. Our platform removes barriers and creates welcoming spaces for diverse communities.",
                color: "bg-gray-50",
                highlight: "border-l-gray-500",
              },
              {
                icon: <Shield className="h-8 w-8 text-gray-500" />,
                title: "Trust as Foundation",
                description:
                  "Every feature is built with security and transparency at its core, creating a trusted environment for all participants.",
                color: "bg-gray-50",
                highlight: "border-l-gray-500",
              },
              {
                icon: <Heart className="h-8 w-8 text-gray-500" />,
                title: "Connection as Purpose",
                description:
                  "Technology should bring people together. We design every interaction to strengthen human connections, not replace them.",
                color: "bg-gray-50",
                highlight: "border-l-gray-500",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md",
                  "before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:transition-all before:duration-300",
                  value.highlight,
                  "hover:before:w-2",
                )}
              >
                <div className={cn("mb-6 flex h-16 w-16 items-center justify-center rounded-xl", value.color)}>
                  {value.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Approach Section */}
          <div className="mx-auto mt-32 max-w-6xl">
            <div className="grid gap-16 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Our Approach
                </div>
                <h3 className="mt-6 text-3xl font-bold tracking-tight">Thoughtfully Crafted Experiences</h3>
                <div className="mt-6 space-y-6 text-lg text-gray-600">
                  <p>
                    We believe that exceptional event experiences don&apos;t happen by accident—they&lsquo;re
                    meticulously designed with intention and care.
                  </p>
                  <p>
                    Our platform is built on a foundation of user-centered design, where every feature, interaction, and
                    workflow is crafted to feel intuitive and effortless.
                  </p>
                </div>

                <div className="mt-10 space-y-6">
                  {[
                    {
                      title: "User-Centered Design",
                      description: "Every feature is built around real user needs and feedback.",
                    },
                    {
                      title: "Continuous Improvement",
                      description: "We're constantly refining and enhancing the platform based on community insights.",
                    },
                    {
                      title: "Ethical Technology",
                      description: "We build with integrity, prioritizing privacy and transparency.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/experience.png?height=800&width=800"
                      alt="Our design process"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Floating stats cards */}
                <div className="absolute -bottom-6 -left-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:max-w-[240px]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">User Satisfaction</p>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                      <ChevronRight className="h-5 w-5 rotate-90" />
                    </div>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-gray-900">98.7%</p>
                  <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-2 w-[98.7%] rounded-full bg-gray-500"></div>
                  </div>
                </div>

                <div className="absolute -right-6 top-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:max-w-[240px]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">Platform Growth</p>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                      <ChevronRight className="h-5 w-5 -rotate-90" />
                    </div>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-gray-900">127%</p>
                  <p className="mt-1 text-sm text-gray-500">Year over year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
              <Calendar className="mr-2 h-4 w-4" />
              Platform Capabilities
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              Engineered for Exceptional <br />
              Event Experiences
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              Our comprehensive suite of features empowers event creators and attendees alike.
            </p>
          </div>

          <div className="mx-auto mt-20 grid max-w-6xl gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Calendar className="h-6 w-6 text-gray-500" />,
                title: "Flexible Event Creation",
                description:
                  "Create public or private events with customizable registration options and fee structures.",
                features: ["Public & private events", "Custom registration forms", "Flexible pricing options"],
              },
              {
                icon: <Users className="h-6 w-6 text-gray-500" />,
                title: "Intelligent Participation",
                description: "Our smart system manages approvals, payments, and communications in one seamless flow.",
                features: ["Automated approvals", "Integrated payments", "Participant management"],
              },
              {
                icon: <Clock className="h-6 w-6 text-gray-500" />,
                title: "Real-time Management",
                description: "Monitor registrations, approve requests, and communicate with participants instantly.",
                features: ["Live dashboard", "Instant notifications", "Participant messaging"],
              },
              {
                icon: <Shield className="h-6 w-6 text-gray-500" />,
                title: "Secure Transactions",
                description: "Enterprise-grade security ensures safe and transparent financial transactions.",
                features: ["PCI compliance", "Fraud protection", "Transparent fees"],
              },
              {
                icon: <Globe className="h-6 w-6 text-gray-500" />,
                title: "Discovery Engine",
                description:
                  "Intelligent algorithms connect users with events that match their interests and preferences.",
                features: ["Personalized recommendations", "Advanced search", "Interest matching"],
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-gray-500" />,
                title: "Community Building",
                description: "Foster connections before, during, and after events with integrated communication tools.",
                features: ["Event discussions", "Attendee networking", "Post-event engagement"],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute -right-3 -top-3 h-24 w-24 rounded-br-[100px] bg-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50">
                  {feature.icon}
                </div>

                <div className="relative">
                  <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                  <p className="mb-6 text-gray-600">{feature.description}</p>

                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={sectionRefs[3]} className="relative bg-gray-50 py-24 md:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <svg
            className="absolute -right-16 -top-16 h-64 w-64 text-gray-100"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M42.7,-73.4C55.9,-67.1,67.7,-57.2,76.3,-44.6C84.9,-32,90.3,-16,89.5,-0.5C88.7,15,81.8,30,72.2,42.4C62.6,54.8,50.3,64.7,36.7,70.5C23.1,76.3,8.2,78.1,-6.9,77.8C-22,77.5,-37.3,75.1,-49.3,67.5C-61.3,59.9,-70,47.1,-76.2,32.8C-82.4,18.5,-86.1,2.7,-83.2,-11.8C-80.3,-26.3,-70.8,-39.5,-59.2,-48.9C-47.6,-58.3,-33.9,-63.9,-20.8,-70.1C-7.7,-76.3,5.8,-83.1,19.2,-82.1C32.6,-81.1,46,-79.6,42.7,-73.4Z"
              transform="translate(100 100)"
            />
          </svg>

          <svg
            className="absolute -bottom-16 -left-16 h-64 w-64 text-gray-100"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M47.7,-79.1C62.3,-71.9,75.1,-60.5,83.2,-46.1C91.3,-31.7,94.7,-14.3,92.9,2.1C91.1,18.5,84.1,33.9,74.3,47.2C64.5,60.5,51.9,71.7,37.2,77.7C22.5,83.7,5.8,84.5,-10.2,81.9C-26.2,79.3,-41.5,73.3,-54.4,63.5C-67.3,53.7,-77.8,40.1,-83.2,24.5C-88.6,8.9,-88.9,-8.7,-83.5,-24.2C-78.1,-39.7,-67,-53.2,-53.4,-61.4C-39.8,-69.6,-23.7,-72.5,-7.4,-71.9C8.9,-71.3,33.1,-67.2,47.7,-79.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
              <Users className="mr-2 h-4 w-4" />
              The Visionaries
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
              Meet the Team Behind <br />
              the Innovation
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              A diverse group of passionate individuals united by a shared vision.
            </p>
          </div>

          <div className="mx-auto mt-20 grid max-w-6xl gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                image: "/images/1.png?height=400&width=400",
                quote: "Technology should enhance human connection, not replace it.",
              },
              {
                name: "Jamie Chen",
                role: "Chief Technology Officer",
                image: "/images/2.png?height=400&width=400",
                quote: "We build for people first, technology second.",
              },
              {
                name: "Sam Wilson",
                role: "Head of Design",
                image: "/images/1.png?height=400&width=400",
                quote: "Great design disappears, leaving only great experiences.",
              },
              {
                name: "Taylor Reed",
                role: "Community Director",
                image: "/images/2.png?height=400&width=400",
                quote: "Communities thrive when everyone feels they belong.",
              },
            ].map((member, index) => (
              <div key={index} className="group relative">
                <div className="relative mb-6 overflow-hidden rounded-2xl bg-gray-100">
                  <div className="aspect-[3/4]">
                    <div className="relative h-full w-full">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-light italic">"{member.quote}"</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Company Culture */}
          <div className="mx-auto mt-32 max-w-6xl rounded-2xl bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                  <Heart className="mr-2 h-4 w-4" />
                  Our Culture
                </div>
                <h3 className="mt-6 text-2xl font-bold md:text-3xl">
                  Built on Passion, <br />
                  Driven by Purpose
                </h3>
                <div className="mt-6 space-y-4 text-gray-600">
                  <p>
                    We&apos;ve cultivated a culture where innovation thrives, diverse perspectives are celebrated, and
                    every team member is empowered to make an impact.
                  </p>
                  <p>
                    Our shared values guide everything we do—from how we build our platform to how we interact with our
                    community.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Innovation", "Integrity", "Inclusion", "Impact", "Empathy"].map((value, i) => (
                    <span key={i} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                      {value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { src: "/images/born.jpg?height=300&width=300", alt: "Team collaboration" },
                  { src: "/images/born.jpg?height=300&width=300", alt: "Office environment" },
                  { src: "/images/born.jpg?height=300&width=300", alt: "Team meeting" },
                  { src: "/images/born.jpg?height=300&width=300", alt: "Team celebration" },
                ].map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={img.src || "/images/born.jpg"}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-black py-20 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

          {/* Animated particles */}
          <div className="absolute inset-0">
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
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Transform Your Event Experience?
            </h2>
            <p className="mb-10 text-xl text-white/80">
              Join thousands of event creators and participants who are already connecting through our platform.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Create Your Event
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:grid-cols-2 md:grid-cols-4">
            {[
              { value: "10K+", label: "Events Created" },
              { value: "50K+", label: "Active Users" },
              { value: "100+", label: "Countries" },
              { value: "99%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-white md:text-4xl">{stat.value}</p>
                <p className="text-sm text-white/70 md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight">Get in Touch</h2>
                <p className="mb-8 text-lg text-gray-600">
                  Have questions or feedback? We&apos;d love to hear from you. Our team is always ready to assist.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Email</h3>
                      <p className="mt-1 text-gray-600">hello@eventplanner.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                      <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Location</h3>
                      <p className="mt-1 text-gray-600">
                        123 Event Street, Suite 100
                        <br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">Follow Us</h3>
                  <div className="flex space-x-4">
                    {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((platform, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 shadow-sm transition-colors hover:bg-gray-200"
                      >
                        <span className="sr-only">{platform}</span>
                        {/* Placeholder for social icons */}
                        <div className="h-5 w-5 rounded-full bg-gray-500"></div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <div className="relative aspect-[4/3] h-full w-full">
                  <Image
                    src="/images/born.jpg?height=600&width=800"
                    alt="Our office"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-lg font-medium text-white">Visit our headquarters</p>
                  <p className="text-white/80">Monday-Friday, 9am-5pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
