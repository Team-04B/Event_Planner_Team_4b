"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, ImageIcon, Loader2 } from 'lucide-react'
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { getEventById, updateEvent } from "@/service/Events"
import { toast } from "sonner"
import Image from "next/image"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.date({ required_error: "Event date is required" }),
  venue: z.string().min(3, { message: "Venue must be at least 3 characters" }),
  publicEvent: z.boolean(),
  paidEvent: z.boolean(),
  fee: z.string().optional().nullable(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 5MB`)
    .optional()
    .nullable(),
})

interface EditEventDialogProps {
  eventId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEventUpdated: () => void
}

export function EditEventDialog({ eventId, open, onOpenChange, onEventUpdated }: EditEventDialogProps) {
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      publicEvent: true,
      paidEvent: false,
      fee: null,
      image: null,
    },
  })

  const paidEvent = form.watch("paidEvent")

  // Fetch event details when dialog opens
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId || !open) return

      setFetchLoading(true)
      setError(null)

      try {
        const response = await getEventById(eventId)

        if (response.success && response.data) {
          const event = response.data

          // Reset form with event data
          form.reset({
            title: event.title,
            description: event.description,
            date: new Date(event.dateTime),
            venue: event.venue,
            publicEvent: event.isPublic,
            paidEvent: event.isPaid,
            fee: event.fee ? event.fee.toString() : null,
            image: null, // Can't set the file input value
          })

          // Set image preview if available
          if (event.eventImgUrl) {
            setImagePreview(event.eventImgUrl)
          }
        } else {
          setError(response.error || "Failed to fetch event details")
        }
      } catch (err) {
        setError("An error occurred while fetching event details")
        console.error(err)
      } finally {
        setFetchLoading(false)
      }
    }

    fetchEventDetails()
  }, [eventId, open, form])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!eventId) return

    setLoading(true)
    setError(null)

    try {
      const eventData = {
        title: data.title,
        description: data.description,
        dateTime: data.date?.toISOString() || null,
        venue: data.venue,
        isPublic: data.publicEvent,
        isPaid: data.paidEvent,
        fee: data.fee
          ? typeof data.fee === "string"
            ? parseFloat(data.fee.replace(/[^\d.-]/g, ""))
            : data.fee
          : null,
      }

      const formData = new FormData()
      formData.append("data", JSON.stringify(eventData))
      
      // Only append file if a new image was selected
      if (data.image instanceof File) {
        formData.append("file", data.image)
      }

      const response = await updateEvent(eventId, formData)

      if (response.success) {
        toast.success("Your event has been updated successfully.")
        onOpenChange(false)
        onEventUpdated()
      } else {
        console.log(response.error)
        setError(response.error || "Failed to update event")
        toast.error(response.message || "Failed to update event",)
      }
    } catch (err) {
      setError("An error occurred while updating the event")
      toast.error("An error occurred while updating the event",)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file)
      
      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Event</DialogTitle>
        </DialogHeader>

        {fetchLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading event details...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
            <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Summer Music Festival" {...field} />
                    </FormControl>
                    <FormDescription>Give your event a catchy title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your event..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormDescription>Provide details about your event</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date and Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP p") : <span>Pick a date and time</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          <div className="p-3 border-t border-border">
                            <Input
                              type="time"
                              onChange={(e) => {
                                const date = new Date(field.value || new Date())
                                const [hours, minutes] = e.target.value.split(":")
                                date.setHours(Number.parseInt(hours, 10))
                                date.setMinutes(Number.parseInt(minutes, 10))
                                field.onChange(date)
                              }}
                              defaultValue={field.value ? format(field.value, "HH:mm") : ""}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>When will your event take place?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue</FormLabel>
                      <FormControl>
                        <Input placeholder="Central Park, New York" {...field} />
                      </FormControl>
                      <FormDescription>Where will your event be held?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormItem>
                <FormLabel>Event Image</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    <FormDescription>Upload a new image for your event (max 5MB)</FormDescription>
                  </div>
                  <div className="flex items-center justify-center">
                    {imagePreview ? (
                      <div className="relative h-32 w-full rounded-md overflow-hidden border border-border">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Event preview"
                          width={400}
                          height={300}  
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=128&width=256"
                          }}
                          unoptimized={imagePreview?.startsWith("http") ? false : true}
                        />
                      </div>
                    ) : (
                      <div className="h-32 w-full rounded-md overflow-hidden border border-border flex items-center justify-center bg-muted">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </FormItem>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="publicEvent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Public Event</FormLabel>
                        <FormDescription>Make this event visible to everyone</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paidEvent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Paid Event</FormLabel>
                        <FormDescription>Charge a fee for this event</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {paidEvent && (
                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Fee</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                          <Input
                            type="text"
                            placeholder="0.00"
                            className="pl-8"
                            {...field}
                            value={field.value === null ? "" : field.value}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>How much will you charge for this event?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Event...
                    </>
                  ) : (
                    "Update Event"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
