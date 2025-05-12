"use client"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaymentSuccessPage() {

    const searchParams = useSearchParams()
    const [message, setMessage] = useState("Validating your payment...")

  useEffect(() => {
    // const val_id = searchParams?.get("val_id")
    const tran_id = searchParams?.get("tran_id")

    if (tran_id) {
      fetch(`http://localhost:5000/api/payment/inp`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({tran_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setMessage("🎉 Payment successful and verified!")
          } else {
            setMessage("⚠️ Payment verification failed. Please contact support.")
          }
        })
        .catch((err) => {
          console.error(err)
          setMessage("❌ An error occurred during validation.")
        })
    } else {
      setMessage("Invalid payment redirect. No val_id or tran_id found.")
    }
  }, [searchParams])
  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            Your payment has been processed successfully. You have been registered for the event.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/dashboard/my-events">My Events</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/events">Browse More Events</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
