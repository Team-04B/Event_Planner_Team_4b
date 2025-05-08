"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import ReviewForm from "./ReviewForm"
import ReviewList from "./ReviewList"
import { hasUserReviewedEvent } from "@/lib/data"


interface EventReviewSectionProps {
  eventId: string
  userId: string
}

export default function EventReviewSection({ eventId, userId }: EventReviewSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0)
  const [hasReviewed, setHasReviewed] = useState<boolean>(hasUserReviewedEvent(userId, eventId))

  const handleReviewSuccess = (newReview: any) => {
    setHasReviewed(true)
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Your Review</h3>

          {hasReviewed ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Thank you for your review! Your feedback helps others make informed decisions.
              </AlertDescription>
            </Alert>
          ) : (
            <ReviewForm eventId={eventId} userId={userId} onSuccess={handleReviewSuccess} />
          )}
        </div>

        <ReviewList eventId={eventId} refreshTrigger={refreshTrigger} />
      </CardContent>
    </Card>
  )
}
