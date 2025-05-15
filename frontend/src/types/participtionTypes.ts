export interface ParticipationRequest {
  id: string
  userId: string
  eventId: string
  status: "PENDING" | "ACCEPTED" | "REJECTED"
  paid: boolean
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  event: {
    id: string
    title: string
    description: string
    dateTime: string
    venue: string
    isPaid: boolean
    fee?: number
    eventImgUrl: string
  }
}

export interface ParticipationRequestFilters {
  searchQuery?: string
  paymentFilter?: boolean
  status?: "PENDING" | "ACCEPTED" | "REJECTED"
}
