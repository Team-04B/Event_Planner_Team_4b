/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  EyeIcon,
  FilterIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
  UsersIcon,
  Loader2Icon,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAllEventsByUserId,
  deleteEvent,
  getAllEventsDb,
} from "@/service/Events";
import DeleteModal from "@/components/modules/Events/myEvents/DeleteModal";
import { EventDetailsDialog } from "@/components/modules/Events/myEvents/ViewEventsDetails";

// Update the Event interface to match your Prisma model
interface Event {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  eventImgUrl: string;
  venue: string;
  isPublic: boolean;
  isPaid: boolean;
  fee: number | null;
  creatorId: string;
  participations: any[];
  invitations: any[];
  reviews: { rating: number }[];
  payments: { amount: number }[];
  createdAt: Date;
  updatedAt: Date;
}

export default function EventManagementPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("all");

  // State for event details dialog
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Debounce search term to avoid too many API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch events when filters change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // Prepare filter parameters for API call
        const filterParams: {
          page: number;
          limit: number;
          searchTerm?: string;
          sortBy: string;
          sortOrder: "asc" | "desc";
          [key: string]: any; // 👈 allows extra dynamic fields like isPublic or status
        } = {
          page: currentPage,
          limit: itemsPerPage,
          searchTerm: debouncedSearchTerm,
          sortBy: sortField,
          sortOrder: sortDirection,
        };

        // Add status filter if not "all"
        if (statusFilter !== "all") {
          filterParams.status = statusFilter;
        }

        // Add type filter if not "all"
        if (typeFilter !== "all") {
          filterParams.isPublic = typeFilter === "public" ? "true" : "false";
        }

        if (typeFilter === "paid" || typeFilter === "free") {
          filterParams.isPaid = typeFilter === "paid" ? "true" : "false";
          filterParams.isPublic = "";
        }

        // Call API with filter parameters
        const response = await getAllEventsDb(filterParams);

        if (response.success && response.data) {
          // Use the appropriate data based on the active tab
          let eventsData = [];

          switch (activeTab) {
            case "upcoming":
              eventsData = response.data.upcoming || [];
              break;
            case "completed":
              eventsData = response.data.completed || [];
              break;
            default:
              // Default to paginatedData for "all" tab
              eventsData = response.data.paginatedData || [];
          }

          setEvents(eventsData);
          setTotalEvents(response.meta.total || 0);
          setTotalPages(Math.ceil((response.meta.total || 0) / itemsPerPage));
        } else {
          console.error("Failed to fetch events:", response.message);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [
    currentPage,
    debouncedSearchTerm,
    statusFilter,
    typeFilter,
    sortField,
    sortDirection,
    itemsPerPage,
    activeTab,
  ]);

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Handle view details
  const handleViewDetails = (id: string) => {
    setSelectedEventId(id);
    setDetailsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      try {
        setLoading(true);
        const response = await deleteEvent(eventToDelete);

        if (response.success) {
          // Refresh the events list after deletion
          const filterParams = {
            page: currentPage,
            limit: itemsPerPage,
            searchTerm: debouncedSearchTerm,
            sortBy: sortField,
            sortOrder: sortDirection,
            status: statusFilter !== "all" ? statusFilter : undefined,
            isPublic:
              typeFilter !== "all"
                ? typeFilter === "public"
                  ? "true"
                  : "false"
                : undefined,
          };

          const refreshResponse = await getAllEventsByUserId(filterParams);

          if (refreshResponse.success && refreshResponse.data) {
            setEvents(refreshResponse.data.paginatedData || []);
            setTotalEvents(refreshResponse.meta.total || 0);
            setTotalPages(
              Math.ceil((refreshResponse.meta.total || 0) / itemsPerPage)
            );
          }

          setDeleteDialogOpen(false);
          setEventToDelete(null);
        } else {
          console.error("Failed to delete event:", response.message);
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Get status badge
  const getStatusBadge = (event: Event) => {
    const now = new Date();
    const eventDate = new Date(event.dateTime);

    if (eventDate < now) {
      return <Badge className="bg-blue-500 hover:bg-blue-600">Completed</Badge>;
    } else {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Upcoming</Badge>
      );
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // The API call will be triggered by the useEffect hook when currentPage changes
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    // The API call will be triggered by the useEffect hook when itemsPerPage changes
  };

  return (
    <div className="container mx-auto pb-10">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl">My Events</CardTitle>
            <CardDescription>Manage all your created events</CardDescription>
          </div>
          <Button onClick={() => router.push("/events/create")}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={typeFilter}
                  onValueChange={(value) => {
                    setTypeFilter(value);
                    setCurrentPage(1); // Reset to first page when filter changes
                  }}
                >
                  <SelectTrigger className="w-fit px-2">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                  </SelectContent>
                </Select>

                {/* Items per page selector */}
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) =>
                    handleItemsPerPageChange(Number.parseInt(value))
                  }
                >
                  <SelectTrigger className="w-fit px-2">
                    <span className="text-xs">Show</span>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="20">20 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-4">
                {/* Table */}
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("title")}
                        >
                          <div className="flex items-center">
                            Event Title
                            {sortField === "title" &&
                              (sortDirection === "asc" ? (
                                <ChevronUpIcon className="ml-1 h-4 w-4" />
                              ) : (
                                <ChevronDownIcon className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("dateTime")}
                        >
                          <div className="flex items-center">
                            Date & Time
                            {sortField === "dateTime" &&
                              (sortDirection === "asc" ? (
                                <ChevronUpIcon className="ml-1 h-4 w-4" />
                              ) : (
                                <ChevronDownIcon className="ml-1 h-4 w-4" />
                              ))}
                          </div>
                        </TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Fee</TableHead>
                        <TableHead className="text-center">
                          Participants
                        </TableHead>
                        <TableHead className="text-center">Pending</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Rating</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={10} className="h-24 text-center">
                            <div className="flex justify-center items-center">
                              <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />
                              <span className="ml-2">Loading events...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : events.length > 0 ? (
                        events.map((event, index) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                <Link
                                  href={`/events/${event.id}`}
                                  className="hover:underline text-primary"
                                >
                                  {event.title}
                                </Link>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span className="flex items-center">
                                  <MapPinIcon className="mr-1 h-3 w-3" />
                                  {event.venue}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div>
                                    {format(
                                      new Date(event.dateTime),
                                      "MMM d, yyyy"
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {format(new Date(event.dateTime), "h:mm a")}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={event.isPublic ? "default" : "outline"}
                              >
                                {event.isPublic ? "Public" : "Private"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {event.isPaid ? (
                                <span className="font-medium">
                                  ${event.fee}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">
                                  Free
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center">
                                <UsersIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                                {event.participations?.length || 0}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              {event.invitations?.length > 0 ? (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-50 text-amber-700 hover:bg-amber-50"
                                >
                                  {event.invitations.length} pending
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>{getStatusBadge(event)}</TableCell>
                            <TableCell className="text-right">
                              {event.payments && event.payments.length > 0 ? (
                                <span className="font-medium">
                                  $
                                  {event.payments
                                    .reduce(
                                      (sum, payment) => sum + payment.amount,
                                      0
                                    )
                                    .toLocaleString()}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {event.reviews && event.reviews.length > 0 ? (
                                <div className="flex items-center justify-center">
                                  <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  <span className="ml-1">
                                    {(
                                      event.reviews.reduce(
                                        (sum, review) => sum + review.rating,
                                        0
                                      ) / event.reviews.length
                                    ).toFixed(1)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleViewDetails(event.id)}
                                  >
                                    <EyeIcon className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(`/events/edit/${event.id}`)
                                    }
                                  >
                                    <EditIcon className="mr-2 h-4 w-4" />
                                    Edit Event
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(
                                        `/events/${event.id}/participants`
                                      )
                                    }
                                    disabled={
                                      (!event.participations ||
                                        event.participations.length === 0) &&
                                      (!event.invitations ||
                                        event.invitations.length === 0)
                                    }
                                  >
                                    <UsersIcon className="mr-2 h-4 w-4" />
                                    Manage Participants
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDelete(event.id)}
                                  >
                                    <TrashIcon className="mr-2 h-4 w-4" />
                                    Delete Event
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={10} className="h-24 text-center">
                            No events found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Enhanced Pagination */}
                <div className="flex items-center justify-between space-x-2 py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">
                      {events.length > 0
                        ? (currentPage - 1) * itemsPerPage + 1
                        : 0}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, totalEvents)}
                    </span>{" "}
                    of <span className="font-medium">{totalEvents}</span> events
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1 || loading}
                    >
                      First
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                    >
                      Previous
                    </Button>

                    {/* Page number indicator */}
                    <span className="px-2 py-1 rounded-md bg-muted">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || loading}
                    >
                      Next
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages || loading}
                    >
                      Last
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Event Deleted */}
      <DeleteModal
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        confirmDelete={confirmDelete}
        loading={loading}
      />

      {/* Event Details */}
      <EventDetailsDialog
        eventId={selectedEventId}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </div>
  );
}
