/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon, DollarSignIcon, GlobeIcon, LockIcon, MapPinIcon, StarIcon, UserIcon, Loader2Icon } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getEventById } from "@/service/Events"
import Image from "next/image"

interface EventDetailsDialogProps {
  eventId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDetailsDialog({ eventId, open, onOpenChange }: EventDetailsDialogProps) {
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) return

      setLoading(true)
      setError(null)

      try {
        const response = await getEventById(eventId)
        
        if (response.success && response.data) {
          setEvent(response.data)
        } else {
          setError(response.error || "Failed to fetch event details")
        }
      } catch (err) {
        setError("An error occurred while fetching event details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (open && eventId) {
      fetchEventDetails()
    }
  }, [eventId, open])

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Calculate average rating
  const getAverageRating = (reviews: any[]) => {
    if (!reviews || reviews.length === 0) return null
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  // Calculate total revenue
  const getTotalRevenue = (payments: any[]) => {
    if (!payments || payments.length === 0) return 0
    return payments.reduce((acc, payment) => acc + payment.amount, 0)
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading event details...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
            <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
          </div>
        ) : event ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl">{event.title}</DialogTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant={event.isPublic ? "default" : "outline"}>
                    {event.isPublic ? "Public" : "Private"}
                  </Badge>
                  <Badge variant={event.isPaid ? "secondary" : "outline"}>
                    {event.isPaid ? `$${event.fee}` : "Free"}
                  </Badge>
                </div>
              </div>
              <DialogDescription className="flex items-center mt-2">
                <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                {format(new Date(event.dateTime), "EEEE, MMMM d, yyyy 'at' h:mm a")}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="participants">
                  Participants ({event.participations?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="invitations">
                  Invitations ({event.invitations?.length || 0})
                </TabsTrigger>
                {event.isPaid && (
                  <TabsTrigger value="payments">
                    Payments ({event.payments?.length || 0})
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-4">
                {event.eventImgUrl && (
                  <div className="rounded-lg overflow-hidden h-64 w-full">
                    <Image
                      src={event.eventImgUrl || "/placeholder.svg"} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=800"
                      }}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>About this event</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Event Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start">
                          <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Venue</p>
                            <p className="text-sm text-muted-foreground">{event.venue}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <ClockIcon className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Date & Time</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(event.dateTime), "MMMM d, yyyy")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(event.dateTime), "h:mm a")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          {event.isPublic ? (
                            <GlobeIcon className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                          ) : (
                            <LockIcon className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium">Visibility</p>
                            <p className="text-sm text-muted-foreground">
                              {event.isPublic ? "Public event" : "Private event"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <DollarSignIcon className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Fee</p>
                            <p className="text-sm text-muted-foreground">
                              {event.isPaid ? `$${event.fee}` : "Free event"}
                            </p>
                          </div>
                        </div>

                        {event.reviews && event.reviews.length > 0 && (
                          <div className="flex items-start">
                            <StarIcon className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Rating</p>
                              <div className="flex items-center">
                                <span className="text-sm font-medium mr-1">
                                  {getAverageRating(event.reviews)}
                                </span>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= Math.round(Number(getAverageRating(event.reviews)))
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({event.reviews.length} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-start">
                          <UserIcon className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Created by</p>
                            <p className="text-sm text-muted-foreground">
                              {event.creator?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(event.createdAt), "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Participants Tab */}
              <TabsContent value="participants">
                <Card>
                  <CardHeader>
                    <CardTitle>Participants</CardTitle>
                    <CardDescription>
                      People who have joined this event
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {event.participations && event.participations.length > 0 ? (
                      <div className="space-y-4">
                        {event.participations.map((participation: any) => (
                          <div key={participation.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={participation.user?.profileImg || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {getInitials(participation.user?.name || "User")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{participation.user?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {participation.user?.email}
                                </p>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Joined {format(new Date(participation.createdAt), "MMM d, yyyy")}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No participants have joined this event yet.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Invitations Tab */}
              <TabsContent value="invitations">
                <Card>
                  <CardHeader>
                    <CardTitle>Invitations</CardTitle>
                    <CardDescription>
                      People who have been invited to this event
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {event.invitations && event.invitations.length > 0 ? (
                      <div className="space-y-4">
                        {event.invitations.map((invitation: any) => (
                          <div key={invitation.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={invitation.user?.profileImg || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {getInitials(invitation.user?.name || "User")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{invitation.user?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {invitation.user?.email}
                                </p>
                              </div>
                            </div>
                            <Badge variant={invitation.status === "pending" ? "outline" : 
                                         invitation.status === "accepted" ? "default" : "destructive"}>
                              {invitation.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No invitations have been sent for this event.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payments Tab */}
              {event.isPaid && (
                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Payments</CardTitle>
                          <CardDescription>
                            Payment records for this event
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total Revenue</p>
                          <p className="text-2xl font-bold">${getTotalRevenue(event.payments).toLocaleString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {event.payments && event.payments.length > 0 ? (
                        <div className="space-y-4">
                          {event.payments.map((payment: any) => (
                            <div key={payment.id} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={payment.user?.profileImg || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {getInitials(payment.user?.name || "User")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{payment.user?.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {payment.user?.email}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${payment.amount}</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(payment.createdAt), "MMM d, yyyy")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No payments have been recorded for this event.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No event details found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
