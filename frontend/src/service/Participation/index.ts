import { ParticipationRequest, ParticipationRequestFilters } from "@/types/participtionTypes"

export async function getParticipationRequests(
  filters: ParticipationRequestFilters = {},
): Promise<ParticipationRequest[]> {
  const { searchQuery, paymentFilter, status = "PENDING" } = filters

  // Build query parameters
  const queryParams = new URLSearchParams()

  if (searchQuery) {
    queryParams.append("search", searchQuery)
  }

  if (paymentFilter !== undefined) {
    queryParams.append("paid", paymentFilter.toString())
  }

  if (status) {
    queryParams.append("status", status)
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/participants?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch participation requests")
  }

  return response.json()
}

export async function updateParticipationStatus(
  participationId: string,
  status: "ACCEPTED" | "REJECTED",
): Promise<ParticipationRequest> {
  const response = await fetch(`/api/participations/${participationId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error(`Failed to update participation status to ${status}`)
  }

  return response.json()
}
