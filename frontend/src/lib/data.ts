// Mock data for reviews and users
export type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

export type Event = {
  id: string
  title: string
  description: string
  dateTime: string
  eventImgUrl: string
  venue: string
  isPublic: boolean
  isPaid: boolean
  fee?: number
  creatorId: string
}

export type Review = {
  id: string
  eventId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
}

// Mock users
export const users: User[] = [
  {
    id: "user-1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-2",
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-3",
    name: "Aisha Patel",
    email: "aisha@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-4",
    name: "David Rodriguez",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-5",
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock events
export const events: Event[] = [
  {
    id: "event-1",
    title: "Tech Conference 2025",
    description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders.",
    dateTime: "2025-06-15T09:00:00Z",
    eventImgUrl: "/placeholder.svg?height=300&width=600",
    venue: "Convention Center, Downtown",
    isPublic: true,
    isPaid: true,
    fee: 99.99,
    creatorId: "user-1",
  },
  {
    id: "event-2",
    title: "Community Hackathon",
    description: "A 48-hour hackathon to build solutions for local community problems.",
    dateTime: "2025-07-20T10:00:00Z",
    eventImgUrl: "/placeholder.svg?height=300&width=600",
    venue: "Innovation Hub",
    isPublic: true,
    isPaid: false,
    creatorId: "user-2",
  },
]

// Mock reviews
export const reviews: Review[] = [
  {
    id: "review-1",
    eventId: "event-1",
    userId: "user-2",
    rating: 5,
    comment:
      "This was an amazing conference! The speakers were world-class and I learned so much about the latest technologies. The networking opportunities were also fantastic.",
    createdAt: "2025-06-16T14:23:00Z",
  },
  {
    id: "review-2",
    eventId: "event-1",
    userId: "user-3",
    rating: 4,
    comment:
      "Great event overall. The sessions were informative and well-organized. Only giving 4 stars because the venue was a bit crowded.",
    createdAt: "2025-06-16T16:45:00Z",
  },
  {
    id: "review-3",
    eventId: "event-1",
    userId: "user-4",
    rating: 5,
    comment: "Exceeded my expectations! The workshops were hands-on and practical. Will definitely attend next year.",
    createdAt: "2025-06-17T09:12:00Z",
  },
  {
    id: "review-4",
    eventId: "event-1",
    userId: "user-5",
    rating: 3,
    comment: "The content was good but the schedule was too packed. Barely had time for lunch or networking.",
    createdAt: "2025-06-17T11:30:00Z",
  },
  {
    id: "review-5",
    eventId: "event-2",
    userId: "user-1",
    rating: 5,
    comment: "What an incredible hackathon! The problems were challenging and the mentors were extremely helpful.",
    createdAt: "2025-07-22T18:20:00Z",
  },
  {
    id: "review-6",
    eventId: "event-2",
    userId: "user-3",
    rating: 4,
    comment: "Well-organized event with great prizes. The only downside was the Wi-Fi that kept dropping occasionally.",
    createdAt: "2025-07-23T10:15:00Z",
  },
]

// Helper functions to work with the mock data
export function getReviewsForEvent(eventId: string): (Review & { user: User })[] {
  return reviews
    .filter((review) => review.eventId === eventId)
    .map((review) => {
      const user = users.find((u) => u.id === review.userId)!
      return {
        ...review,
        user,
      }
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getEventById(eventId: string): Event | undefined {
  return events.find((event) => event.id === eventId)
}

export function getUserById(userId: string): User | undefined {
  return users.find((user) => user.id === userId)
}

export function hasUserReviewedEvent(userId: string, eventId: string): boolean {
  return reviews.some((review) => review.userId === userId && review.eventId === eventId)
}

export function getCurrentUser(): User {
  // For demo purposes, we'll return the first user as the current user
  return users[0]
}

export function getAverageRating(eventId: string): number {
  const eventReviews = reviews.filter((review) => review.eventId === eventId)
  if (eventReviews.length === 0) return 0

  const sum = eventReviews.reduce((total, review) => total + review.rating, 0)
  return Number.parseFloat((sum / eventReviews.length).toFixed(1))
}
