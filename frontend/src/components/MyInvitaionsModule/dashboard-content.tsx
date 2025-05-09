"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Calendar, ChevronLeft, ChevronRight, Filter, MapPin, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getAllInvitaions } from "@/service/Invitations"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Invitation {
  id: string
  eventId: string
  userEmail: string
  invitedById: string
  invitationNote: string
  status: "PENDING" | "ACCEPTED" | "DECLINED"
  paid: boolean
  createdAt: string
  event: {
    id: string
    title: string
    description: string
    dateTime: string
    eventImgUrl: string
    venue: string
    isPublic: boolean
    isPaid: boolean
    fee: number
    creatorId: string
    createdAt: string
    updatedAt: string
  }
  invitedUser: {
    id: string
    name: string
    email: string
    password: string
    role: string
    createdAt: string
    updatedAt: string
  }
}

interface InvitationsResponse {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: Invitation[]
}

export default function DashboardContent() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState(10)

  const [allInvitations, setAllInvitations] = useState<Invitation[]>([])
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 })
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredInvitations, setFilteredInvitations] = useState<Invitation[]>([])

  // Add a state for pagination cache to avoid refetching
  const [paginationCache, setPaginationCache] = useState<Record<number, Invitation[]>>({})

  useEffect(() => {
    const fetchInvitations = async () => {
      // Check if we already have this page in cache
      if (paginationCache[currentPage]) {
        setAllInvitations(paginationCache[currentPage])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const response = await getAllInvitaions(currentPage, pageSize)
        const invitationsData = response?.data as InvitationsResponse

        if (invitationsData) {
          setAllInvitations(invitationsData.data)
          setMeta(invitationsData.meta)

          // Update cache with this page's data
          setPaginationCache((prev) => ({
            ...prev,
            [currentPage]: invitationsData.data,
          }))
        }
      } catch (error) {
        console.error("Error fetching invitations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInvitations()
  }, [currentPage, pageSize, paginationCache])

  useEffect(() => {
    // Apply frontend filtering
    let filtered = [...allInvitations]

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((invitation) => invitation.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (invitation) =>
          invitation.event.title.toLowerCase().includes(query) ||
          invitation.event.venue.toLowerCase().includes(query) ||
          invitation.invitationNote.toLowerCase().includes(query),
      )
    }

    setFilteredInvitations(filtered)
  }, [statusFilter, searchQuery, allInvitations])

  // Update the handlePageChange function to use state instead of URL
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "ACCEPTED":
        return "bg-green-100 text-green-800"
      case "DECLINED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalPages = Math.ceil(meta.total / meta.limit) || 1 // Ensure at least 1 page

  // Improved pagination rendering with better handling of edge cases
  const renderPaginationNumbers = () => {
    // If there are 7 or fewer pages, show all page numbers
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Button
          key={pageNum}
          variant={currentPage === pageNum ? "default" : "outline"}
          size="sm"
          className="h-8 w-8"
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </Button>
      ))
    }

    // For more than 7 pages, use a more complex pagination display
    const pageNumbers = []

    // Always show first page
    pageNumbers.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        className="h-8 w-8"
        onClick={() => handlePageChange(1)}
      >
        1
      </Button>,
    )

    // Calculate the range of pages to show
    let startPage = Math.max(2, currentPage - 2)
    let endPage = Math.min(totalPages - 1, startPage + 4)

    // Adjust if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(2, totalPages - 5)
      endPage = totalPages - 1
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push(
        <span key="ellipsis-start" className="px-2">
          ...
        </span>,
      )
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          className="h-8 w-8"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>,
      )
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="ellipsis-end" className="px-2">
          ...
        </span>,
      )
    }

    // Always show last page
    pageNumbers.push(
      <Button
        key={totalPages}
        variant={currentPage === totalPages ? "default" : "outline"}
        size="sm"
        className="h-8 w-8"
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Button>,
    )

    return pageNumbers
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="DECLINED">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date & Venue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : filteredInvitations.length > 0 ? (
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Event</TableHead>
                <TableHead className="w-[250px]">Date & Venue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvitations.map((invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={invitation.event.eventImgUrl || "/placeholder.svg"}
                          alt={invitation.event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{invitation.event.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {invitation.invitationNote || invitation.event.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {formatDate(invitation.event.dateTime)}
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {invitation.event.venue}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invitation.status)}>{invitation.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {invitation.paid && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      )}
                      {invitation.event.isPaid && (
                        <div className="text-sm text-muted-foreground">
                          Fee: ${(invitation.event.fee / 100).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {invitation.status === "PENDING" ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm">Accept</Button>
                        <Button variant="outline" size="sm">
                          Decline
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Contact Organizer</DropdownMenuItem>
                          <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <h3 className="text-lg font-medium">No invitations found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "You don't have any invitations yet"}
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {/* Custom Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center">{renderPaginationNumbers()}</div>

          {/* Custom Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      )}

      {/* Page info */}
      {totalPages > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  )
}
