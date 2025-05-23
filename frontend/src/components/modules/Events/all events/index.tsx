/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { getAllEvents } from "@/service/Events"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { Event } from "@/types/eventType"
import { FilterSidebar } from "./filter-sidebar"
import { EventSkeleton } from "./event-skeleton"
import { EventCard } from "./event-card"
import { Pagination } from "./pagination"
import { useRouter, useSearchParams } from "next/navigation"

export default function AllEvents() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams?.get("category")

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  // Filter state that matches FilterSidebar expectations
  const [filters, setFilters] = useState({
    publicFree: false,
    publicPaid: false,
    privateFree: false,
    privatePaid: false,
  })

  // Additional filter states
  const [categoryFilter, setCategoryFilter] = useState<string | null| undefined>(categoryParam || null)
  const [sortField,] = useState("createdAt")
  const [sortDirection,] = useState<"asc" | "desc">("desc")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [eventsPerPage] = useState(6)
  const [meta, setMeta] = useState<any>({})

  // Mobile filter drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Update category filter when URL param changes
  useEffect(() => {
    setCategoryFilter(categoryParam)
  }, [categoryParam])

  // Fetch events when filters change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError("")

        const filterParams: {
          page: number
          limit: number
          searchTerm?: string
          sortBy: string
          sortOrder: "asc" | "desc"
          isPublic?: string
          isPaid?: string
          category?: string
        } = {
          page: currentPage,
          limit: eventsPerPage,
          sortBy: sortField,
          sortOrder: sortDirection,
        }

        // Add search term if exists
        if (debouncedSearchTerm) {
          filterParams.searchTerm = debouncedSearchTerm
        }

        // Add category filter if exists
        if (categoryFilter && categoryFilter !== "Category") {
          filterParams.category = categoryFilter
        }

        // Convert filter checkboxes to API parameters
        const activeFilters = Object.entries(filters).filter(([, value]) => value)

        if (activeFilters.length > 0) {
          // If specific filters are selected, apply them
          const publicFilters = activeFilters.filter(([key]) => key.startsWith("public"))
          const privateFilters = activeFilters.filter(([key]) => key.startsWith("private"))
          const freeFilters = activeFilters.filter(([key]) => key.endsWith("Free"))
          const paidFilters = activeFilters.filter(([key]) => key.endsWith("Paid"))

          // Handle public/private filter
          if (publicFilters.length > 0 && privateFilters.length === 0) {
            filterParams.isPublic = "true"
          } else if (privateFilters.length > 0 && publicFilters.length === 0) {
            filterParams.isPublic = "false"
          }

          // Handle free/paid filter
          if (freeFilters.length > 0 && paidFilters.length === 0) {
            filterParams.isPaid = "false"
          } else if (paidFilters.length > 0 && freeFilters.length === 0) {
            filterParams.isPaid = "true"
          }
        }

        const response = await getAllEvents(filterParams)

        if (response.success && response.data) {
          setEvents(response.data.paginatedData || [])
          setMeta(response.meta || {})
        } else {
          setError("Failed to fetch events.")
          setEvents([])
        }
      } catch (err: any) {
        console.error("Fetch error:", err)
        setError(err.message || "Error fetching events.")
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [currentPage, debouncedSearchTerm, categoryFilter, filters, sortField, sortDirection, eventsPerPage])

  // Update URL when category changes
  const updateCategoryFilter = (category: string | null) => {
    setCategoryFilter(category)

    const params = new URLSearchParams(searchParams?.toString())

    if (!category || category === "Category") {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    router.replace(`/events?${params.toString()}`)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      publicFree: false,
      publicPaid: false,
      privateFree: false,
      privatePaid: false,
    })
    setSearchTerm("")
    updateCategoryFilter(null)
    setCurrentPage(1)
  }

  // Calculate total pages
  const totalPages = Math.ceil((meta.total || 0) / eventsPerPage)

  // List of available categories
  const categories = [
    "Professional",
    "Educational",
    "Social",
    "Business",
    "Health",
    "Sports",
    "Tech",
    "Sales",
    "Community",
    "Personal",
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Discover Events</h1>
        <p className="text-muted-foreground mt-1">Find and join amazing events</p>
      </div>

      {/* Category Filter Pills */}
      {categoryFilter && (
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <Button variant="secondary" size="sm" onClick={() => updateCategoryFilter(null)} className="h-7">
              {categoryFilter} ×
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {Object.values(filters).some(Boolean) && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    {Object.values(filters).filter(Boolean).length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <h2 className="text-xl font-bold mb-6">Event Filters</h2>
              <div className="py-6">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  clearFilters={clearFilters}
                  searchTerm={searchTerm}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={updateCategoryFilter}
                  categories={categories}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={updateCategoryFilter}
            categories={categories}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by title, organizer or description"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Results Info */}
          {!loading && (
            <div className="mb-4 text-sm text-muted-foreground">
              {meta.total ? `Showing ${events.length} of ${meta.total} events` : "No events found"}
            </div>
          )}

          {/* Events Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <EventSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-red-500">Error</h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">Try changing your filters or search term</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
