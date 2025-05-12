"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useAppSelector } from "@/redux/hook"
import { currentToken } from "@/redux/userSlice/userSlice"

interface JoinEventButtonProps {
  eventId: string
  isPaid: boolean
  fee?: number
}

export default function JoinEventButton({ eventId, isPaid, fee }: JoinEventButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const token = useAppSelector(currentToken)

  const handleJoinEvent = async () => {
    try {
      setIsLoading(true)

      if (!token) {
        router.push("/login?redirect=" + encodeURIComponent(window.location.pathname))
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/initpayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ eventId }),
      })

      const data = await response.json()
      console.log(data)
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl // Redirect to SSLCommerz
      } else {
        alert("Payment initialization failed: " + (data.message || "Unknown error"))
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong while joining the event.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleJoinEvent} className="w-full" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing
        </>
      ) : (
        <>Join {isPaid ? `($${fee?.toFixed(2)})` : "Free"} Event</>
      )}
    </Button>
  )
}
