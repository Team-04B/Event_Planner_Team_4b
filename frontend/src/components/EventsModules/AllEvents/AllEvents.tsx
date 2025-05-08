
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, StarIcon } from "lucide-react"
import { format } from "date-fns"

import { IEvent } from "@/commonTypes/commonTypes"
import { getAverageRating } from "@/lib/ReviewGenarator"
import { use } from "react"



export default function AllEvents({events}:{events:IEvent[]}) {
  return (
    <div className="container mx-auto py-6 sm:py-8 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Upcoming Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {events.map((event) => {
          const avgRating = use(getAverageRating(event.id))
          console.log(avgRating)

          return (
            <Card key={event.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-40 sm:h-48 w-full">
                <Image
                  src={event.eventImgUrl || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <CardContent className="pt-4 sm:pt-6 flex-grow">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">{event.title}</h2>
                <div className="flex items-center mb-3 sm:mb-4">
                  {avgRating > 0 ? (
                    <>
                      <div className="flex mr-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                              avgRating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm">{avgRating}</span>
                    </>
                  ) : (
                    <span className="text-xs sm:text-sm text-gray-500">No reviews yet</span>
                  )}
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0" />
                    {format(new Date(event.dateTime), "PPP")}
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 flex-shrink-0" />
                    {event.venue}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-700 line-clamp-2">{event.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild className="w-full">
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
