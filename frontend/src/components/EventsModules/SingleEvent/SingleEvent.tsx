import Image from "next/image"
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import EventReviewSection from "@/components/EventsModules/EventReviewSection"
import { IEvent } from "@/commonTypes/commonTypes"
type SingleEvent = {
event:IEvent;
currentUser:any;
}
export default function SingleEvent({event,currentUser}:SingleEvent) {

  return (
    <div className="container mx-auto py-6 sm:py-8 px-4">
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={event.eventImgUrl || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
            />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{event.title}</h1>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                {format(new Date(event.dateTime), "PPP p")}
              </div>
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                {event.venue}
              </div>
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <TicketIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                {event.isPaid ? `$${event.fee?.toFixed(2)}` : "Free"}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <p className="text-gray-700">{event.description}</p>
          </div>

          <div className="mt-6 sm:mt-8">
            <EventReviewSection eventId={event.id} userId={currentUser.id} />
          </div>
        </div>

        <div className="order-first md:order-last">
          <Card className="sticky top-4">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Date and Time</p>
                  <p className="font-medium">{format(new Date(event.dateTime), "PPP")}</p>
                  <p className="font-medium">{format(new Date(event.dateTime), "p")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{event.venue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">{event.isPaid ? `$${event.fee?.toFixed(2)}` : "Free"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visibility</p>
                  <p className="font-medium">{event.isPublic ? "Public" : "Private"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
