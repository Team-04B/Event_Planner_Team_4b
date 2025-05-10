/* eslint-disable @typescript-eslint/no-unused-vars */
import { format } from "date-fns";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/eventType";
import Image from "next/image";
import Link from "next/link";

export function EventCard({ event }: { event: Event }) {
  // Safely format date with error handling
  const formatEventDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return "Date not available";
    }
  };

  const formatEventTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return "Time not available";
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow p-0">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={
            event.eventImgUrl ||
            `/placeholder.svg?height=192&width=384&text=${
              encodeURIComponent(event.title) || "/placeholder.svg"
            }`
          }
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />

        <div className="absolute top-3 right-3 flex gap-2">
          <Badge
            variant={event.isPublic ? "default" : "secondary"}
            className={
              event.isPublic
                ? "bg-blue-500 hover:bg-blue-500"
                : "bg-purple-500 hover:bg-purple-500"
            }
          >
            {event.isPublic ? "Public" : "Private"}
          </Badge>
          <Badge
            variant={event.isPaid ? "outline" : "outline"}
            className={
              event.isPaid
                ? "bg-red-50 text-red-600 hover:bg-red-50 border-red-200"
                : "bg-green-50 text-green-600 hover:bg-green-50 border-green-200"
            }
          >
            {event.isPaid ? `$${event.fee?.toFixed(2) || "0.00"}` : "Free"}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>{event.creator?.name || "Unknown organizer"}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatEventDate(event.dateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatEventTime(event.dateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/events/${event.id}`} className="w-full mb-4"><Button>View Details</Button></Link>
      </CardFooter>
    </Card>
  );
}
