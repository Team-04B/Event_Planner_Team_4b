"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data based on your Prisma schema
const featuredEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Join the biggest tech conference in Asia with industry leaders and innovators.",
    dateTime: new Date("2025-03-15T09:00:00"),
    eventImgUrl: "/placeholder.svg?height=400&width=600",
    venue: "International Convention Center, Singapore",
    isPublic: true,
    isPaid: true,
    fee: 299.99,
    creatorName: "TechEvents Asia",
    participantCount: 1240,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Summer Music Festival",
    description: "Three days of amazing music performances from top artists across the globe.",
    dateTime: new Date("2025-06-20T16:00:00"),
    eventImgUrl: "/placeholder.svg?height=400&width=600",
    venue: "Riverside Park, Bangkok",
    isPublic: true,
    isPaid: true,
    fee: 149.5,
    creatorName: "Global Music Productions",
    participantCount: 5000,
    rating: 4.9,
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    description: "Connect with fellow entrepreneurs and investors in a casual setting.",
    dateTime: new Date("2025-02-28T18:30:00"),
    eventImgUrl: "/placeholder.svg?height=400&width=600",
    venue: "Innovation Hub, Kuala Lumpur",
    isPublic: false,
    isPaid: false,
    fee: null,
    creatorName: "Startup Malaysia",
    participantCount: 120,
    rating: 4.7,
  },
  {
    id: "4",
    title: "Culinary Masterclass",
    description: "Learn the art of Asian fusion cooking from Michelin-starred chefs.",
    dateTime: new Date("2025-04-10T10:00:00"),
    eventImgUrl: "/placeholder.svg?height=400&width=600",
    venue: "Gourmet Academy, Jakarta",
    isPublic: true,
    isPaid: true,
    fee: 89.99,
    creatorName: "Asian Culinary Arts",
    participantCount: 50,
    rating: 4.9,
  },
  {
    id: "5",
    title: "Digital Marketing Workshop",
    description: "Master the latest digital marketing strategies and tools.",
    dateTime: new Date("2025-05-05T09:30:00"),
    eventImgUrl: "/placeholder.svg?height=400&width=600",
    venue: "Business Center, Manila",
    isPublic: true,
    isPaid: true,
    fee: 149.99,
    creatorName: "Marketing Pros",
    participantCount: 75,
    rating: 4.6,
  },
  {
    id: "6",
    title: "Yoga Retreat Weekend",
    description: "Rejuvenate your mind and body with a weekend of yoga and meditation.",
    dateTime: new Date("2025-07-15T08:00:00"),
    eventImgUrl: "/placeholder.svg?height=400&width=600",
    venue: "Serenity Resort, Bali",
    isPublic: false,
    isPaid: true,
    fee: 399.99,
    creatorName: "Wellness Collective",
    participantCount: 30,
    rating: 4.9,
  },
]

export default function FeaturedEventsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const maxSlides = Math.ceil(featuredEvents.length / 3)

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides)
    }, 5000)
  }

  useEffect(() => {
    if (autoplay) startAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [autoplay, maxSlides])

  const handleSlideChange = (direction: "next" | "prev") => {
    setAutoplay(false)
    if (direction === "next") {
      setCurrentSlide((prev) => (prev + 1) % maxSlides)
    } else {
      setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
    }
  }

  const visibleEvents = featuredEvents.slice(currentSlide * 3, Math.min((currentSlide + 1) * 3, featuredEvents.length))

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800">Featured Events</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Discover Extraordinary Events
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore our curated selection of upcoming events from around the world
          </p>
        </motion.div>

        <div className="relative">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {visibleEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={event.eventImgUrl || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center justify-between">
                            <Badge
                              className={cn(
                                event.isPublic
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-200",
                              )}
                            >
                              {event.isPublic ? "Public" : "Private"}
                            </Badge>
                            {event.isPaid ? (
                              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                                ${event.fee?.toFixed(2)}
                              </Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Free</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            {event.dateTime.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="mr-2 h-4 w-4" />
                            {event.dateTime.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span className="line-clamp-1">{event.venue}</span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="flex items-center justify-between border-t bg-gray-50 px-6 py-3">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{event.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-300">•</span>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{event.participantCount}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                          asChild
                        >
                          <Link href={`/events/${event.id}`}>Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <motion.button
            onClick={() => handleSlideChange("prev")}
            className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-100 md:-left-5"
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </motion.button>
          <motion.button
            onClick={() => handleSlideChange("next")}
            className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-100 md:-right-5"
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </motion.button>

          {/* Dots indicator */}
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setAutoplay(false)
                }}
                className={`h-2 w-8 rounded-full transition-all ${
                  currentSlide === index ? "bg-purple-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="/events">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
