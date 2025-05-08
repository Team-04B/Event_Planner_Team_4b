"use client"

import { useState, useEffect } from "react"
import { StarIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getAverageRating } from "@/lib/ReviewGenarator"
import { User } from "@/commonTypes/commonTypes"
import { getAllReviews } from "@/service/Review"


interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: User
}

interface ReviewListProps {
  eventId: string
  refreshTrigger?: number
}

export default function ReviewList({ eventId, refreshTrigger = 0 }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [averageRating, setAverageRating] = useState<number>(0)

  useEffect(() => {
    // Simulate API call with a small delay
    const fetchReviews = async () => {
      setLoading(false)
      try {
        // Get reviews from our mock data
        const Reviews =await getAllReviews(eventId)
       const eventReviews= Reviews.data
        setReviews(eventReviews)

        // Calculate average rating
        const avgRating = await (getAverageRating(eventId))
        setAverageRating(avgRating)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [eventId, refreshTrigger])

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>
  }

  if (reviews.length === 0) {
    return <div className="text-center py-8 text-gray-500">No reviews yet. Be the first to review!</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-5 w-5 ${
                averageRating >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : averageRating >= star - 0.5
                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                    : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="font-medium">{averageRating}</span>
        <span className="text-gray-500">
          ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
        </span>
      </div>

      <div className="divide-y">
        {reviews.map((review) => (
          <div key={review.id} className="py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  {/* <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} /> */}
                  <AvatarFallback>{review?.user?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review?.user?.name}</p>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-4 w-4 ${
                          review.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <time className="text-sm text-gray-500 mt-1 sm:mt-0">
                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
              </time>
            </div>
            {review.comment && <p className="mt-3 text-gray-700 sm:pl-12">{review.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
