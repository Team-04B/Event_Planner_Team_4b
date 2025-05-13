/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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

// Define the types based on the provided data model
type Creator = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

type Review = {
  id: string
  eventId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
}

type Invitation = {
  id: string
  eventId: string
  userEmail: string
  invitedById: string
  invitationNote: string
  status: "PENDING" | "ACCEPTED" | "DECLINED"
  paid: boolean
  createdAt: string
}

export type Event = {
  id: string
  title: string
  description: string
  dateTime: string
  eventImgUrl: string
  venue: string
  isPublic: boolean
  isPaid: boolean
  fee: number
  creatorId: string
  createdAt: string
  updatedAt: string
  creator: Creator
  reviews: Review[]
  invitations: Invitation[]
  participations: any[]
}

export default function FeaturedEventsSection({ events }:  { events: Event[] } ) {
  const featuredEvents = (events || []).slice(0, 6)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Get the number of cards to display based on screen size
  const getVisibleCount = () => {
    return screenSize === "mobile" ? 1 : screenSize === "tablet" ? 2 : 3
  }

  // Calculate max slides based on screen size
  const maxSlides = Math.ceil(featuredEvents.length / getVisibleCount())

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize("mobile")
      } else if (width < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    // Initial call
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset current slide when screen size changes to prevent empty slides
  useEffect(() => {
    setCurrentSlide(0)
  }, [screenSize])

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides)
    }, 6000)
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

  // If there are no events, don't render the section
  if (!featuredEvents.length) return null

  // Get visible events based on current slide and screen size
  const visibleEvents = featuredEvents.slice(
    currentSlide * getVisibleCount(),
    Math.min((currentSlide + 1) * getVisibleCount(), featuredEvents.length),
  )

  // Calculate average rating for each event
  const getAverageRating = (reviews: Review[]) => {
    if (!reviews.length) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

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
          <Badge className="mb-4 bg-gray-100 text-black">Featured Events</Badge>
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
                transition={{ duration: 0.6 }}
                className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {visibleEvents.map((event, index) => {
                  const eventDate = new Date(event.dateTime)
                  const averageRating = getAverageRating(event.reviews)
                  const participantCount = event.invitations.filter((inv) => inv.status === "ACCEPTED").length

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
             
                    >
                      <Card className="group h-full w-full overflow-hidden transition-all hover:shadow-md">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={event.eventImgUrl || "/placeholder.svg?height=400&width=600"}
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
                                    ? "bg-white text-black hover:bg-gray-100"
                                    : "bg-gray-200 text-black hover:bg-gray-300",
                                )}
                              >
                                {event.isPublic ? "Public" : "Private"}
                              </Badge>
                              {event.isPaid ? (
                                <Badge className="bg-black text-white hover:bg-gray-900">
                                  ${(event.fee / 100).toFixed(2)}
                                </Badge>
                              ) : (
                                <Badge className="bg-gray-800 text-white hover:bg-gray-700">Free</Badge>
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
                              {eventDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Clock className="mr-2 h-4 w-4" />
                              {eventDate.toLocaleTimeString("en-US", {
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
                              <Star className="mr-1 h-4 w-4 text-gray-700" />
                              <span className="text-sm font-medium">{averageRating || "N/A"}</span>
                            </div>
                            <span className="mx-2 text-gray-300">•</span>
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{participantCount}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-black hover:bg-gray-100 hover:text-black"
                            asChild
                          >
                            <Link href={`/events/${event.id}`}>Details</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Only show navigation if there's more than one slide */}
          {maxSlides > 1 && (
            <>
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
                      currentSlide === index ? "bg-black" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button className="bg-black hover:bg-gray-900" asChild>
            <Link href="/events">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
