/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Types based on the Prisma schema
type InvitationStatus = "PENDING" | "ACCEPTED" | "DECLINED"
type Invitation = {
  id: string
  eventId: string
  event: {
    id: string
    title: string
    description: string
    dateTime: Date
    eventImgUrl: string
    venue: string
    isPublic: boolean
    isPaid: boolean
    fee: number | null
  }
  userId: string
  invitedUser: {
    id: string
    name: string
    email: string
  }
  status: InvitationStatus
  paid: boolean
  createdAt: Date
}

type InvitationsData={
  data:Invitation[];
  meta:any
}

export default function InvitationsPage({ InvitationsData }:{InvitationsData:InvitationsData}) {
const invitations = InvitationsData?.data;
  const [invitationsState] = useState<any[]>(invitations || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [currentTab, setCurrentTab] = useState("all")

  // Filter invitations based on search, status, and payment filters
  const filteredInvitations = invitationsState.filter((invitation: any) => {
    // Search filter
    const matchesSearch =
      invitation?.invitedUser?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invitation?.invitedUser?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invitation?.event?.title?.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || invitation?.status?.toLowerCase() === statusFilter.toLowerCase()

    // Payment filter
    const matchesPayment =
      paymentFilter === "all" ||
      (paymentFilter === "paid" && invitation?.paid) ||
      (paymentFilter === "unpaid" && !invitation?.paid)

    // Tab filter
    const matchesTab = currentTab === "all" || invitation?.status?.toLowerCase() === currentTab.toLowerCase()

    return matchesSearch && matchesStatus && matchesPayment && matchesTab
  })

  // Format date to readable string
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invitations</h2>
          <p className="text-muted-foreground">Manage your event invitations and track responses</p>
        </div>
        <Link
          href="/dashboard/invitations/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New Invitation
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invitations..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="declined">Declined</TabsTrigger>
          </TabsList>

          <TabsContent value={currentTab} className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">
                  {currentTab === "all"
                    ? "All Invitations"
                    : `${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)} Invitations`}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-1 md:grid-cols-7 p-4 font-medium border-b">
                    <div className="md:col-span-2">Invitee</div>
                    <div className="md:col-span-2">Event</div>
                    <div>Status</div>
                    <div>Payment</div>
                    <div className="text-right">Actions</div>
                  </div>
                  {filteredInvitations.length === 0 ? (
                    <div className="p-8 text-center">
                      <MailIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-semibold">No invitations found</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {searchQuery
                          ? "Try adjusting your search or filters"
                          : "Create your first invitation to get started"}
                      </p>
                      <Button className="mt-4" asChild>
                        <Link href="/dashboard/invitations/new">
                          <PlusIcon className="mr-2 h-4 w-4" />
                          New Invitation
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredInvitations.slice(0, 10).map((invitation: any) => (
                        <div
                          key={invitation.id}
                          className="grid grid-cols-1 md:grid-cols-7 p-4 text-sm items-center gap-4 md:gap-0"
                        >
                          <div className="md:col-span-2 flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${invitation?.invitedUser?.name}`}
                                alt={invitation?.invitedUser?.name}
                              />
                              <AvatarFallback>
                                <UserIcon className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{invitation?.invitedUser?.name}</div>
                              <div className="text-xs text-muted-foreground">{invitation?.invitedUser?.email}</div>
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="font-medium">{invitation?.event?.title}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              {formatDate(invitation?.event?.dateTime)}
                            </div>
                          </div>
                          <div>
                            <Badge
                              variant="outline"
                              className={`
                                ${
                                  invitation?.status === "ACCEPTED"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : invitation?.status === "PENDING"
                                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                                }
                              `}
                            >
                              {invitation?.status === "ACCEPTED" && <CheckIcon className="mr-1 h-3 w-3" />}
                              {invitation?.status === "PENDING" && <ClockIcon className="mr-1 h-3 w-3" />}
                              {invitation?.status === "DECLINED" && <XIcon className="mr-1 h-3 w-3" />}
                              {invitation?.status}
                            </Badge>
                          </div>
                          <div>
                            {invitation?.event?.isPaid ? (
                              <Badge
                                variant="outline"
                                className={`
                                  ${
                                    invitation?.paid
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : "bg-gray-50 text-gray-700 border-gray-200"
                                  }
                                `}
                              >
                                {invitation?.paid ? "PAID" : "UNPAID"}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                FREE
                              </Badge>
                            )}
                          </div>
                          <div className="flex justify-end gap-2">
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Link href={`/dashboard/invitations/${invitation.id}/edit`} className="w-full">
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Send reminder</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Cancel invitation</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
