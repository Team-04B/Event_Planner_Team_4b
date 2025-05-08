import { IEvent, User } from "@/commonTypes/commonTypes"

// Fake events data
  export const events: IEvent[] = [
    {
      id: "event-1",
      title: "Annual Tech Conference",
      description: "Join us for the biggest tech event of the year",
      dateTime: new Date(2025, 5, 15, 9, 0),
      eventImgUrl: "/placeholder.svg?height=400&width=600",
      venue: "Convention Center, New York",
      isPublic: true,
      isPaid: true,
      fee: 99.99,
    },
    {
      id: "event-2",
      title: "Product Launch Party",
      description: "Be the first to see our new product lineup",
      dateTime: new Date(2025, 6, 20, 18, 30),
      eventImgUrl: "/placeholder.svg?height=400&width=600",
      venue: "Tech Hub, San Francisco",
      isPublic: false,
      isPaid: true,
      fee: 49.99,
    },
    {
      id: "event-3",
      title: "Team Building Retreat",
      description: "A weekend of team building activities",
      dateTime: new Date(2025, 7, 5, 10, 0),
      eventImgUrl: "/placeholder.svg?height=400&width=600",
      venue: "Mountain Resort, Colorado",
      isPublic: false,
      isPaid: false,
      fee: null,
    },
    {
      id: "event-4",
      title: "Networking Mixer",
      description: "Connect with professionals in your industry",
      dateTime: new Date(2025, 8, 12, 19, 0),
      eventImgUrl: "/placeholder.svg?height=400&width=600",
      venue: "Downtown Lounge, Chicago",
      isPublic: true,
      isPaid: true,
      fee: 25.0,
    },
    {
      id: "event-5",
      title: "Workshop: Future of AI",
      description: "Learn about the latest developments in AI",
      dateTime: new Date(2025, 9, 8, 13, 0),
      eventImgUrl: "/placeholder.svg?height=400&width=600",
      venue: "Innovation Center, Boston",
      isPublic: true,
      isPaid: true,
      fee: 75.0,
    },
  ]

  // Fake users data
  export const users: User[] = [
    { id: "user-1", name: "John Doe", email: "john.doe@example.com" },
    { id: "user-2", name: "Sarah Smith", email: "sarah.smith@example.com" },
    { id: "user-3", name: "Michael Johnson", email: "michael.j@example.com" },
    { id: "user-4", name: "Emily Davis", email: "emily.davis@example.com" },
    { id: "user-5", name: "Alex Wilson", email: "alex.wilson@example.com" },
    { id: "user-6", name: "Lisa Brown", email: "lisa.brown@example.com" },
    { id: "user-7", name: "David Miller", email: "david.miller@example.com" },
    { id: "user-8", name: "Emma Wilson", email: "emma.wilson@example.com" },
    { id: "user-9", name: "Chris Taylor", email: "chris.taylor@example.com" },
    { id: "user-10", name: "Olivia Martin", email: "olivia.martin@example.com" },
  ]