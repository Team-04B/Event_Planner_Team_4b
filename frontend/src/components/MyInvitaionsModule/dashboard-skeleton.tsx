import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="h-10 bg-gray-200 rounded w-64 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
        </div>
      </div>

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
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
    </div>
  )
}
