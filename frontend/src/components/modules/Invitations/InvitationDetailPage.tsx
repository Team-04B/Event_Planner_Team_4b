"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  DollarSignIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
  UserIcon,
  XIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { AcceptInvitaon, DeclineInvitaion, getSingleInvitaion } from "@/service/Invitations"
import { CreatePayment } from "@/service/payment"


// Types based on the real data model
interface Invitation {
  id: string
  eventId: string
  userEmail: string
  invitedById: string
  invitationNote: string
  status: "PENDING" | "ACCEPTED" | "DECLINED"
  paid: boolean
  createdAt: string
  invitedBy: {
    id: string
    name: string
    email: string
    password: string
    role: string
    createdAt: string
    updatedAt: string
  }
  event: {
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
  }
}

export default function InvitationDetailPage({id}:{id:string}) {
 

  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getSingleInvitaion(id)
        setInvitation(result?.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load invitation details")
        setLoading(false)
        console.error("Error fetching invitation:", err)
      }
    }
    fetchData()
  }, [id])

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Format time to readable string
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Generate timeline events based on real data
  const generateTimeline = (invitation: Invitation) => {
    const timeline = [
      {
        action: "Invitation Created",
        timestamp: new Date(invitation.createdAt),
        description: `Invitation was created by ${invitation.invitedBy.name}`,
      },
    ]

    // Add more timeline events based on status
    if (invitation.status === "ACCEPTED") {
      timeline.push({
        action: "Invitation Accepted",
        timestamp: new Date(), // We don't have the actual acceptance date in the data model
        description: "The invitation was accepted by the recipient",
      })
    } else if (invitation.status === "DECLINED") {
      timeline.push({
        action: "Invitation Declined",
        timestamp: new Date(), // We don't have the actual decline date in the data model
        description: "The invitation was declined by the recipient",
      })
    }

    // Add payment event if paid
    if (invitation.paid) {
      timeline.push({
        action: "Payment Completed",
        timestamp: new Date(), // We don't have the actual payment date in the data model
        description: `Payment of $${(invitation.event.fee / 100).toFixed(2)} was completed`,
      })
    }

    return timeline
  }

  // all actions ---------------------------------------

  const HandleAcceptInvitaion = async (id: string) => {
    try {
      const res = await AcceptInvitaon(id)
      console.log(res)
      if (res?.success) {
        // Refresh the invitation data to get updated status
        const updatedInvitation = await getSingleInvitaion(id)
        setInvitation(updatedInvitation?.data)
      }
    } catch (error) {
      console.error("Error accepting invitation:", error)
    }
  }
  const HandleDeclineInvitaion = async (id: string) => {
    try {
      const res = await DeclineInvitaion(id)
      console.log(res)
      if (res?.success) {
        // Refresh the invitation data to get updated status
        const updatedInvitation = await getSingleInvitaion(id)
        setInvitation(updatedInvitation?.data)
      }
    } catch (error) {
      console.error("Error accepting invitation:", error)
    }
  }
const createPayment =async (id:string)=>{
  const res =await CreatePayment(id)
  console.log(res)
}
  // Format datetime for timeline
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading invitation details...</p>
        </div>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <XIcon className="h-12 w-12 text-destructive mx-auto" />
          <h3 className="mt-4 text-lg font-medium">Failed to load invitation</h3>
          <p className="mt-2 text-muted-foreground">{error || "Invitation not found"}</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  const timeline = generateTimeline(invitation)
console.log(invitation)
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/invitations">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Invitation Details</h2>
        <Badge
          variant="outline"
          className={`ml-2
            ${
              invitation.status === "ACCEPTED"
                ? "bg-green-50 text-green-700 border-green-200"
                : invitation.status === "PENDING"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-red-50 text-red-700 border-red-200"
            }
          `}
        >
          {invitation.status === "ACCEPTED" && <CheckIcon className="mr-1 h-3 w-3" />}
          {invitation.status === "PENDING" && <ClockIcon className="mr-1 h-3 w-3" />}
          {invitation.status === "DECLINED" && <XIcon className="mr-1 h-3 w-3" />}
          {invitation.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{invitation.event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>
                        {formatDate(invitation.event.dateTime)} at {formatTime(invitation.event.dateTime)}
                      </span>
                    </div>
                  </CardDescription>
                </div>
                {invitation.event.isPaid && (
                  <div className="flex items-center">
                    <DollarSignIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="font-medium">${(invitation.event.fee / 100).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                <Image
                  src={invitation.event.eventImgUrl || "/placeholder.svg"}
                  alt={invitation.event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Event Description</h3>
                  <p className="text-sm text-muted-foreground">{invitation.event.description}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {invitation.event.venue}
                  </div>
                </div>

                {invitation.invitationNote && (
                  <div>
                    <h3 className="font-medium mb-1">Invitation Note</h3>
                    <p className="text-sm text-muted-foreground">{invitation.invitationNote}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <Badge variant={invitation.event.isPublic ? "default" : "outline"}>
                      {invitation.event.isPublic ? "Public Event" : "Private Event"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/events/${invitation.event.id}`}>View Event Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invitation Timeline</CardTitle>
              <CardDescription>History of this invitation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l space-y-6">
                {timeline.map((event, index) => (
                  <div className="relative" key={index}>
                    <div
                      className={`absolute -left-[25px] p-1 rounded-full ${index === 0 ? "bg-primary" : "bg-muted"}`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          index === 0 ? "bg-primary-foreground" : "bg-muted-foreground"
                        }`}
                      ></div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{event.action}</div>
                      <div className="text-xs text-muted-foreground">{event.description}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <ClockIcon className="mr-1 h-3 w-3" />
                        {formatDateTime(event.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invitation Status</CardTitle>
              <CardDescription>Current status of this invitation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status</span>
                <Badge
                  variant="outline"
                  className={`
                    ${
                      invitation.status === "ACCEPTED"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : invitation.status === "PENDING"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                    }
                  `}
                >
                  {invitation.status}
                </Badge>
              </div>

              {invitation.event.isPaid && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Payment</span>
                  <Badge variant={invitation.paid ? "default" : "outline"}>{invitation.paid ? "PAID" : "UNPAID"}</Badge>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Invited On</span>
                <span className="text-sm">{formatDate(invitation.createdAt)}</span>
              </div>

              {invitation.event.isPaid && !invitation.paid && (
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Price</span>
                  <span className="font-medium">${(invitation.event.fee / 100).toFixed(2)}</span>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Quick Actions</h3>
                {invitation.status === "PENDING" && (
                  <>
                    <Button onClick={() => HandleAcceptInvitaion(invitation?.id)} className="w-full" variant="default">
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Accept Invitation
                    </Button>
                    <Button onClick={()=>HandleDeclineInvitaion(invitation.id)} className="w-full" variant="outline">
                      <XIcon className="mr-2 h-4 w-4" />
                      Decline Invitation
                    </Button>
                  </>
                )}
                {invitation.status === "ACCEPTED" && invitation.event.isPaid && (
                  <Button onClick={()=>createPayment(invitation?.eventId)} className="w-full" variant="default">
                    <DollarSignIcon className="mr-2 h-4 w-4" />
                    Make Payment
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <SendIcon className="mr-2 h-4 w-4" />
                  Contact Organizer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invited By</CardTitle>
              <CardDescription>Details about the event organizer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${invitation.invitedBy.name}`}
                    alt={invitation.invitedBy.name}
                  />
                  <AvatarFallback>
                    <UserIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{invitation.invitedBy.name}</div>
                  <div className="text-sm text-muted-foreground">Organizer</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{invitation.invitedBy.email}</span>
              </div>
            </CardContent>
            <CardFooter>
              {/* <Button variant="outline" className="w-full" asChild>
                <Link href={`/users/${invitation.invitedBy.id}`}>View Profile</Link>
              </Button> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
