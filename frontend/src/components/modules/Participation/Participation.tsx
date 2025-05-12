"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"
import { useAppSelector } from "@/redux/hook"
import { currentToken } from "@/redux/userSlice/userSlice"

// Types based on your backend
interface User {
  id: string
  name: string
  email: string
}

interface Event {
  id: string
  title: string
  date: string
}

interface Participation {
  id: string
  status: string
  paid: boolean
  createdAt: string
  user: User
  event: Event
}

interface PaginationMeta {
  page: number
  limit: number
  total: number
}

interface ParticipationsResponse {
  success: boolean
  statusCode: number
  message: string
  meta: PaginationMeta
  data: Participation[]
}

export default function PendingParticipationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useAppSelector(currentToken)

  // State for participations data
  const [participations, setParticipations] = useState<Participation[]>([])
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
  })

  // State for filters
  const [searchTerm, setSearchTerm] = useState(searchParams?.get("searchTerm") || "")
  const [paidFilter, setPaidFilter] = useState(searchParams?.get("paid") || "")
  const [sortBy, setSortBy] = useState(searchParams?.get("sortBy") || "createdAt")
  const [sortOrder, setSortOrder] = useState(searchParams?.get("sortOrder") || "desc")
  const [loading, setLoading] = useState(false)

  // Fetch participations based on current filters and pagination
  const fetchParticipations = async () => {
    setLoading(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()
      if (searchTerm) params.append("searchTerm", searchTerm)
      if (paidFilter) params.append("paid", paidFilter)
      params.append("page", meta.page.toString())
      params.append("limit", meta.limit.toString())
      params.append("sortBy", sortBy)
      params.append("sortOrder", sortOrder)
      if(!token){
        throw new Error("No access token found.");
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/participants?${params.toString()}`,{
      method: "GET",
      headers: { Authorization: token },
      credentials: "include",
    })
      const data: ParticipationsResponse = await response.json()

      if (data.success) {
        setParticipations(data.data)
        setMeta(data.meta)
      }
    } catch (error) {
      console.error("Error fetching participations:", error)
    } finally {
      setLoading(false)
    }
  }

  // Update URL with current filters
  const updateUrl = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append("searchTerm", searchTerm)
    if (paidFilter) params.append("paid", paidFilter)
    params.append("page", meta.page.toString())
    params.append("sortBy", sortBy)
    params.append("sortOrder", sortOrder)

    router.push(`/dashboard/pending-participations?${params.toString()}`)
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setMeta({ ...meta, page: 1 }) // Reset to first page on new search
    updateUrl()
    fetchParticipations()
  }

  // Handle paid filter change
  const handlePaidFilterChange = (value: string) => {
    setPaidFilter(value)
    setMeta({ ...meta, page: 1 }) // Reset to first page on filter change
    setTimeout(() => {
      updateUrl()
      fetchParticipations()
    }, 0)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setMeta({ ...meta, page })
    setTimeout(() => {
      updateUrl()
      fetchParticipations()
    }, 0)
  }

  // Initial fetch on component mount
  useEffect(() => {
    fetchParticipations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Calculate total pages for pagination
  const totalPages = Math.ceil(meta.total / meta.limit)

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Participations</CardTitle>
          <CardDescription>Manage all pending participation requests for your events</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by user name, email or event title..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={paidFilter} onValueChange={handlePaidFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Paid</SelectItem>
                  <SelectItem value="false">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => fetchParticipations()}>Apply Filters</Button>
          </div>

          {/* Participations Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : participations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No pending participations found
                    </TableCell>
                  </TableRow>
                ) : (
                  participations.map((participation) => (
                    <TableRow key={participation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{participation.user.name}</div>
                          <div className="text-sm text-muted-foreground">{participation.user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{participation.event.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {participation.paid ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Paid
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            Unpaid
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{format(new Date(participation.createdAt), "MMM dd, yyyy")}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => meta.page > 1 && handlePageChange(meta.page - 1)}
                    className={meta.page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum = i + 1
                  if (totalPages > 5) {
                    if (meta.page > 3) {
                      pageNum = meta.page - 3 + i
                    }
                    if (pageNum > totalPages - 4) {
                      pageNum = totalPages - 4 + i
                    }
                  }

                  return (
                    <PaginationItem key={i}>
                      <PaginationLink onClick={() => handlePageChange(pageNum)} isActive={meta.page === pageNum}>
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && meta.page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => meta.page < totalPages && handlePageChange(meta.page + 1)}
                    className={meta.page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
