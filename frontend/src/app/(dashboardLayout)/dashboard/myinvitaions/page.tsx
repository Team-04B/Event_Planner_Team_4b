import DashboardContent from "@/components/MyInvitaionsModule/dashboard-content"
import { DashboardSkeleton } from "@/components/MyInvitaionsModule/dashboard-skeleton"
import { Suspense } from "react"


const page =async () => {
  return (
    <div className="container mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold mb-6">My All Invitations</h1>
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  </div>
  )
}

export default page