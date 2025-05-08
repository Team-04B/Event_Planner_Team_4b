"use client"

import type React from "react"

import { useState } from "react"
import { StarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CreateReview } from "@/service/Review"

interface ReviewFormProps {
  eventId: string
  userId: string
  onSuccess?: (newReview: any) => void
}

export default function ReviewForm({ eventId, userId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Please select a rating")
      return
    }
    setIsSubmitting(true)
    setError(null)

    try {
      // Create a new review with mock data
      const newReview = {
        eventId,
        userId,
        rating,
        comment
      }
      
    const res = await CreateReview(newReview)
    
      if(res.success){
        setRating(0)
        setComment("")
      }
      if (onSuccess) {
        onSuccess(newReview)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Your Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none touch-manipulation p-1 sm:p-0.5"
              aria-label={`Rate ${star} stars`}
            >
              <StarIcon
                className={`h-7 w-7 sm:h-6 sm:w-6 ${
                  rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="block text-sm font-medium">
          Your Comment (Optional)
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={4}
          className="w-full resize-none"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={isSubmitting || rating === 0} className="w-full sm:w-auto" size="lg">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
