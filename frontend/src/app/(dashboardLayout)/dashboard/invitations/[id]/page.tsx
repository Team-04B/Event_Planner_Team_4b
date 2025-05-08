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

// Types based on the Prisma schema
type InvitationStatus = "PENDING" | "ACCEPTED" | "DECLINED"

export default function InvitationDetailPage({ params }: { params: { id: string } }) {
  // Fake invitation data - in a real app, this would be fetched from the database
  const invitation = {
    id: params.id,
    eventId: "event-1",
    event: {
      id: "event-1",
      title: "Annual Tech Conference",
      description:
        "Join us for the biggest tech event of the year with keynote speakers, workshops, and networking opportunities. This three-day conference covers the latest trends in technology, innovation, and digital transformation.",
      dateTime: new Date(2025, 5, 15, 9, 0),
      eventImgUrl: "/placeholder.svg?height=400&width=600",
      venue: "Convention Center, New York",
      isPublic: true,
      isPaid: true,
      fee: 99.99,
    },
    userId: "user-1",
    invitedUser: {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    status: "PENDING" as InvitationStatus,
    paid: false,
    createdAt: new Date(2025, 4, 10),
    timeline: [
      {
        action: "Invitation Created",
        timestamp: new Date(2025, 4, 10, 14, 30),
        description: "Invitation was created and queued for delivery",
      },
      {
        action: "Email Sent",
        timestamp: new Date(2025, 4, 10, 14, 32),
        description: "Invitation email was sent to john.doe@example.com",
      },
      {
        action: "Email Opened",
        timestamp: new Date(2025, 4, 10, 16, 45),
        description: "Recipient opened the invitation email",
      },
      {
        action: "Invitation Link Clicked",
        timestamp: new Date(2025, 4, 10, 16, 47),
        description: "Recipient clicked on the invitation link",
      },
    ],
  }

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Format time to readable string
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
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
                    <span className="font-medium">${invitation.event.fee?.toFixed(2)}</span>
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

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <Badge variant={invitation.event.isPublic ? "default" : "outline"}>
                      {invitation.event.isPublic ? "Public Event" : "Private Event"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Event Details
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
                {invitation.timeline.map((event, index) => (
                  <div className="relative" key={index}>
                    <div
                      className={`absolute -left-[25px] p-1 rounded-full ${index === 0 ? "bg-primary" : "bg-muted"}`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${index === 0 ? "bg-primary-foreground" : "bg-muted-foreground"}`}
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
                  <span className="font-medium">${invitation.event.fee?.toFixed(2)}</span>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Quick Actions</h3>
                {invitation.status === "PENDING" && (
                  <>
                    <Button className="w-full" variant="default">
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Mark as Accepted
                    </Button>
                    <Button className="w-full" variant="outline">
                      <XIcon className="mr-2 h-4 w-4" />
                      Mark as Declined
                    </Button>
                  </>
                )}
                {invitation.event.isPaid && !invitation.paid && (
                  <Button className="w-full" variant={invitation.status === "PENDING" ? "outline" : "default"}>
                    <DollarSignIcon className="mr-2 h-4 w-4" />
                    Mark as Paid
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send Reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invitee Information</CardTitle>
              <CardDescription>Details about the invited user</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${invitation.invitedUser.name}`}
                    alt={invitation.invitedUser.name}
                  />
                  <AvatarFallback>
                    <UserIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{invitation.invitedUser.name}</div>
                  <div className="text-sm text-muted-foreground">User ID: {invitation.invitedUser.id}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{invitation.invitedUser.email}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View User Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
