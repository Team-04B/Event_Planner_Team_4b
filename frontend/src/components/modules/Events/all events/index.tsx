"use client";

import { useEffect, useState } from "react";
import { getAllEvents } from "@/service/Events";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Event } from "@/types/eventType";
import { FilterSidebar } from "./filter-sidebar";
import { EventSkeleton } from "./event-skeleton";
import { EventCard } from "./event-card";
import { Pagination } from "./pagination";


export default function AllEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);

  // Filter state
  const [filters, setFilters] = useState({
    publicFree: false,
    publicPaid: false,
    privateFree: false,
    privatePaid: false,
  });

  // Mobile filter drawer state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch all events on initial load
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAllEvents();

        if (response?.success) {
          // Check if paginatedData exists and has items
          if (
            response.data?.paginatedData &&
            Array.isArray(response.data.paginatedData)
          ) {
            setEvents(response.data.paginatedData);
            setFilteredEvents(response.data.paginatedData);
          } else if (response.data && Array.isArray(response.data)) {
            // Alternative: check if data is directly an array
            setEvents(response.data);
            setFilteredEvents(response.data);
          } else {
            setError("No events found.");
          }
        } else {
          setError("Failed to fetch events.");
        }
      } catch (err: any) {
        console.error("Error fetching events:", err);
        setError(err.message || "Error fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Apply filters when filter state or search term updates
  useEffect(() => {
    let result = [...events];

    // Check if any filters are active
    const hasActiveFilters = Object.values(filters).some((value) => value);

    // Apply category filters if any are active
    if (hasActiveFilters) {
      result = result.filter((event) => {
        if (filters.publicFree && event.isPublic && !event.isPaid) return true;
        if (filters.publicPaid && event.isPublic && event.isPaid) return true;
        if (filters.privateFree && !event.isPublic && !event.isPaid)
          return true;
        if (filters.privatePaid && !event.isPublic && event.isPaid) return true;
        return false;
      });
    }

    // Apply search filter (case insensitive)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          (event.creator?.name &&
            event.creator.name.toLowerCase().includes(term)) ||
          (event.description && event.description.toLowerCase().includes(term))
      );
    }

    setFilteredEvents(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, searchTerm, events]);

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      publicFree: false,
      publicPaid: false,
      privateFree: false,
      privatePaid: false,
    });
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Discover Events</h1>
        <p className="text-muted-foreground mt-1">
          Find and join amazing events
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
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

          {/* Events Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <EventSkeleton key={i} />
              ))}
            </div>
          ) : currentEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                Try changing your filters or search term
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
