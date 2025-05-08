/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeftIcon, CheckCircleIcon, Loader2Icon, PlusIcon, UserIcon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { User } from "@/commonTypes/commonTypes"
import { CreateInvitaion } from "@/service/Invitations"
import { Event } from "@/types/eventType"

export default function NewInvitationPage({ userDatas, allEventData }: { userDatas: User[]; allEventData: any }) {
  const router = useRouter()
 
  // Form state
  const [formData, setFormData] = useState({
    eventId: "",
    userId: "",
    email: "",
    message: "",
    requirePayment: false,
  })

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [userSearchOpen, setUserSearchOpen] = useState(false)
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Filter users based on search query
  const filteredUsers = userDatas?.filter(
    (user:User) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase()),
  )
  // Get selected event details
  const selectedEvent = allEventData?.find((event: { id: string }) => event.id === formData?.eventId)
  // Handle form input changes
  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Handle user selection
  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setFormData((prev) => ({
      ...prev,
      userId: user.id,
      email: user.email,
    }))
    setUserSearchOpen(false)
  }
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.eventId) {
      newErrors.eventId = "Please select an event"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast("Please check the form for errors")
      return
    }
    setIsSubmitting(true)

    try {
      // Format data to match the Invitation model structure
      const invitationData = {
        eventId: formData.eventId,
        userEmail: formData.email,
        invitationNote: formData.message,
        paid: formData.requirePayment
      }
      const res = await CreateInvitaion(invitationData)
      console.log(res)
      if(res.success){
         // Show success dialog
         setShowSuccess(true)
              // Reset form
      setFormData({
        eventId: "",
        userId: "",
        email: "",
        message: "",
        requirePayment: false,
      })
      setSelectedUser(null)
      }
   

 
    } catch (error) {
      console.error('Invitation error:', error);
      toast(error instanceof Error ? error.message : "Failed to send invitation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    router.push("/dashboard/invitations")
  }

// Format date to readable string
const formatDate = (date: string | Date) => {
  // Convert string date to Date object if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateObj)
}
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/invitations">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Create New Invitation</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Invitation Details</CardTitle>
            <CardDescription>Create a new invitation to send to users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event" className={errors.eventId ? "text-destructive" : ""}>
                  Select Event
                </Label>
                <Select value={formData.eventId} onValueChange={(value) => handleChange("eventId", value)}>
                  <SelectTrigger id="event" className={errors.eventId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {allEventData?.map((event:Event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.eventId && <p className="text-sm text-destructive mt-1">{errors.eventId}</p>}
              </div>

              {selectedEvent && (
                <div className="rounded-md border p-3 bg-muted/30">
                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedEvent.title}</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {formatDate(selectedEvent.dateTime)} • {selectedEvent.venue}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={selectedEvent.isPublic ? "default" : "outline"} className="text-xs">
                          {selectedEvent.isPublic ? "Public" : "Private"}
                        </Badge>
                        {selectedEvent.isPaid ? (
                          <Badge variant="outline" className="text-xs">
                            ${selectedEvent.fee?.toFixed(2)}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Free
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                  Invitee Email
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        handleChange("email", e.target.value)
                        setSelectedUser(null)
                      }}
                      className={errors.email ? "border-destructive" : ""}
                    />
                  </div>
                  <Popover open={userSearchOpen} onOpenChange={setUserSearchOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" type="button">
                        <UserIcon className="h-4 w-4 mr-2" />
                        Find User
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="end" side="bottom">
                      <Command>
                        <CommandInput
                          placeholder="Search users..."
                          value={userSearchQuery}
                          onValueChange={setUserSearchQuery}
                        />
                        <CommandList>
                          <CommandEmpty>No users found.</CommandEmpty>
                          <CommandGroup>
                            {filteredUsers?.map((user) => (
                              <CommandItem key={user.id} value={user.id} onSelect={() => handleUserSelect(user)}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                                      alt={user.name}
                                    />
                                    <AvatarFallback>
                                      <UserIcon className="h-3 w-3" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col">
                                    <span className="font-medium text-sm">{user.name}</span>
                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                {selectedUser && (
                  <div className="flex items-center gap-2 p-2 rounded-md bg-muted mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedUser.name}`}
                        alt={selectedUser.name}
                      />
                      <AvatarFallback>
                        <UserIcon className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">{selectedUser.name}</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message to include in the invitation email"
                  className="min-h-[100px]"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
              </div>
            </div>

            {selectedEvent?.isPaid && (
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-2">Payment Settings</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment">Require Payment</Label>
                      <p className="text-sm text-muted-foreground">
                        Require the invitee to pay before confirming attendance
                      </p>
                    </div>
                    <Switch
                      id="payment"
                      checked={formData.requirePayment}
                      onCheckedChange={(checked) => handleChange("requirePayment", checked)}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" 
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Send Invitation
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Invitation Sent Successfully
            </AlertDialogTitle>
            <AlertDialogDescription>
              The invitation has been sent to {formData.email}. They will receive an email with instructions on how to
              respond.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSuccessClose}>Return to Invitations</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}