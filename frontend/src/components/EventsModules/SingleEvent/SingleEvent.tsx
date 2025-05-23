"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import EventReviewSection from "@/components/EventsModules/EventReviewSection"
import { IEvent } from "@/commonTypes/commonTypes"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAppSelector } from "@/redux/hook"
import { currentToken, currentUser } from "@/redux/userSlice/userSlice"
import { joinPublicEvent, requestPrivateEvent } from "@/service/Events";
import { toast } from "sonner";
import { useRouter } from "next/navigation"
// import { getCurrentUser } from "@/service/AuthService"

type SingleEvent = {
event:IEvent;
}
export default function SingleEvent({event}:SingleEvent) {
  const router = useRouter()
  const token = useAppSelector(currentToken)
  const user = useAppSelector(currentUser)

  const [loading, setLoading] = useState(false);

  const eventId = event.id;
  const isPublic = event.isPublic;
  const isPaid = event.isPaid;

  // if (!currentUser?.id) {
  //   return (
  //     <div className="text-center py-12">
  //       <h2 className="text-2xl font-bold text-red-500">
  //         You are not authorized!!
  //       </h2>
  //       <p className="mt-2 text-gray-600">Please login to view this event.</p>
  //     </div>
  //   );
  // }

  const handleJoin = async () => {
    // setLoading(true);
    // const currentUser = await getCurrentUser();

    try {

        if (!token) {
        return router.push(`/login?redirectPath=/events/${eventId}`)
      }
      const res = await joinPublicEvent(eventId);
      if (res.success) {
        toast.success(res.message || "Joined successfully!");
      } else {
        toast.error(res.message || "Something went wrong.");
      }
      if(res.success && isPaid){
        await paymentForJoinEvent()
      }
    } catch (error: any) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred.");
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async () => {
    setLoading(true);
    try {
      const res = await requestPrivateEvent(eventId);

      if (res.success) {
        toast.success(res.message || "Requested successfully!");
      } else {
        toast.error(res.message || "Something went wrong.");
      }
      if(res.success && isPaid){
        await paymentForJoinEvent()
      }
    } catch (error: any) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred.");
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Button rendering based on event type
  const renderActionButton = () => {
    if (isPublic && !isPaid) {
      return (
        <Button className="w-full" disabled={loading} onClick={handleJoin}>
          Join Free
        </Button>
      );
    }
    if (isPublic && isPaid) {
      return (
        <Button className="w-full" disabled={loading} onClick={handleJoin}>
          Pay & Join(${event.fee})
        </Button>
      );
    }
    if (!isPublic && !isPaid) {
      return (
        <Button className="w-full" disabled={loading} onClick={handleRequest}>
          Request to Join (${event.fee})
        </Button>
      );
    }
    if (!isPublic && isPaid) {
      return (
        <Button disabled={loading} onClick={handleRequest}>
          Pay & Request (${event.fee})
        </Button>
      );
    }
    return null;
  };

  const paymentForJoinEvent = async() => {
    
    try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/initpayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ eventId }),
      })

      const data = await response.json()
      if (data.data) {
        window.location.href = data.data // Redirect to SSLCommerz
      } else {
        alert("Payment initialization failed: " + (data.message || "Unknown error"))
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong while joining the event.")
    }
  }

  // const handleJoinEvent = async (eventId:string) => {
  //   try {
  //     setLoading(true)

  //     // if (!token) {
  //     //   router.push("/login?redirect=" + encodeURIComponent(window.location.pathname))
  //     //   return
  //     // }

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/initpayment`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `${token}`,
  //       },
  //       body: JSON.stringify({ eventId }),
  //     })

  //     const data = await response.json()
  //     console.log(data)
  //     if (data.data) {
  //       window.location.href = data.data // Redirect to SSLCommerz
  //     } else {
  //       alert("Payment initialization failed: " + (data.message || "Unknown error"))
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     alert("Something went wrong while joining the event.")
  //   } finally {
  //     setLoading(false)
  //   }
  // }
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

          {/* ✅ Conditional action buttons */}
          {/* ✅ Conditional action buttons */}
          {/* {renderActionButton()} */}

        {
          user && <div className="mt-6 sm:mt-8">
            <EventReviewSection eventId={event.id} userId={user.id} />
          </div>
        }
          
        </div>

        <div className="order-first md:order-last">
          <Card className="sticky top-4">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Date and Time</p>
                  <p className="font-medium">
                    {format(new Date(event.dateTime), "PPP")}
                  </p>
                  <p className="font-medium">
                    {format(new Date(event.dateTime), "p")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{event.venue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">
                    {event.isPaid ? `$${event.fee?.toFixed(2)}` : "Free"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visibility</p>
                  <p className="font-medium">
                    {event.isPublic ? "Public" : "Private"}
                  </p>
                </div>
                {/* Join Event Button */}
                 <div className="pt-4 mt-2">
                  
                    {renderActionButton()}
                  
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
