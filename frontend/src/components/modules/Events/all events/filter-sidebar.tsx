"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

interface FilterSidebarProps {
  filters: {
    publicFree: boolean
    publicPaid: boolean
    privateFree: boolean
    privatePaid: boolean
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      publicFree: boolean
      publicPaid: boolean
      privateFree: boolean
      privatePaid: boolean
    }>
  >
  clearFilters: () => void
  searchTerm: string
  categoryFilter?: string | null
  setCategoryFilter?: (category: string | null) => void
  categories?: string[]
}

export function FilterSidebar({
  filters,
  setFilters,
  clearFilters,
  searchTerm,
  categoryFilter,
  setCategoryFilter,
  categories = [],
}: FilterSidebarProps) {
  // Handle filter changes
  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }))
  }

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="space-y-6 p-1">
      <div>
        <h3 className="text-xl font-semibold mb-2">Filters</h3>
        <p className="text-sm text-muted-foreground mb-6">Refine your event search</p>

        <div className="space-y-5">
          {/* Category Filter */}
          {setCategoryFilter && categories.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-3">Category</h4>
              <Select
                value={categoryFilter || "all"}
                onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator className="my-4" />

          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <Badge variant="outline" className="mr-2 py-0 px-1.5">
                {activeFilterCount}
              </Badge>
              Event Type
            </h4>

            <div className="space-y-3 ml-1">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <Checkbox
                  id="publicFree"
                  checked={filters.publicFree}
                  onCheckedChange={() => handleFilterChange("publicFree")}
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                <label
                  htmlFor="publicFree"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-green-600 cursor-pointer flex items-center"
                >
                  <Badge
                    variant="outline"
                    className="mr-2 bg-green-50 text-green-600 hover:bg-green-50 border-green-100"
                  >
                    Free
                  </Badge>
                  Public Events
                </label>
              </div>

              <div className="flex items-center space-x-2 group cursor-pointer">
                <Checkbox
                  id="publicPaid"
                  checked={filters.publicPaid}
                  onCheckedChange={() => handleFilterChange("publicPaid")}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <label
                  htmlFor="publicPaid"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-blue-600 cursor-pointer flex items-center"
                >
                  <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-100">
                    Paid
                  </Badge>
                  Public Events
                </label>
              </div>

              <div className="flex items-center space-x-2 group cursor-pointer">
                <Checkbox
                  id="privateFree"
                  checked={filters.privateFree}
                  onCheckedChange={() => handleFilterChange("privateFree")}
                  className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                />
                <label
                  htmlFor="privateFree"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-amber-600 cursor-pointer flex items-center"
                >
                  <Badge
                    variant="outline"
                    className="mr-2 bg-amber-50 text-amber-600 hover:bg-amber-50 border-amber-100"
                  >
                    Free
                  </Badge>
                  Private Events
                </label>
              </div>

              <div className="flex items-center space-x-2 group cursor-pointer">
                <Checkbox
                  id="privatePaid"
                  checked={filters.privatePaid}
                  onCheckedChange={() => handleFilterChange("privatePaid")}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <label
                  htmlFor="privatePaid"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-purple-600 cursor-pointer flex items-center"
                >
                  <Badge
                    variant="outline"
                    className="mr-2 bg-purple-50 text-purple-600 hover:bg-purple-50 border-purple-100"
                  >
                    Paid
                  </Badge>
                  Private Events
                </label>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h4 className="text-sm font-medium mb-3">Quick Filters</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={Object.values(filters).every((v) => !v) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setFilters({
                    publicFree: false,
                    publicPaid: false,
                    privateFree: false,
                    privatePaid: false,
                  })
                }}
                className="rounded-full"
              >
                All Events
              </Button>

              <Button
                variant={
                  filters.publicFree && filters.publicPaid && !filters.privateFree && !filters.privatePaid
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  setFilters({
                    publicFree: true,
                    publicPaid: true,
                    privateFree: false,
                    privatePaid: false,
                  })
                }}
                className="rounded-full"
              >
                Public Only
              </Button>

              <Button
                variant={
                  !filters.publicFree && !filters.publicPaid && filters.privateFree && filters.privatePaid
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  setFilters({
                    publicFree: false,
                    publicPaid: false,
                    privateFree: true,
                    privatePaid: true,
                  })
                }}
                className="rounded-full"
              >
                Private Only
              </Button>

              <Button
                variant={
                  filters.publicFree && !filters.publicPaid && filters.privateFree && !filters.privatePaid
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  setFilters({
                    publicFree: true,
                    publicPaid: false,
                    privateFree: true,
                    privatePaid: false,
                  })
                }}
                className="rounded-full"
              >
                Free Only
              </Button>

              <Button
                variant={
                  !filters.publicFree && filters.publicPaid && !filters.privateFree && filters.privatePaid
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  setFilters({
                    publicFree: false,
                    publicPaid: true,
                    privateFree: false,
                    privatePaid: true,
                  })
                }}
                className="rounded-full"
              >
                Paid Only
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={clearFilters}
          disabled={!Object.values(filters).some((v) => v) && !searchTerm && !categoryFilter}
        >
          <Filter className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}
