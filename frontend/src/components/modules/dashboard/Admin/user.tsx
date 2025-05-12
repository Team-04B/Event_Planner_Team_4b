/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser } from "@/service/user";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

// Mock user data

export function UserManagementTable({ userData, meta }: any) {
  const router = useRouter();
  const pathName = usePathname();
  const rawParams = useSearchParams();
  const searchParams = rawParams || new URLSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const handleClickDeleteUser = async (id: string) => {
     await deleteUser(id);
  };

  const handleClickSearchQuery = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchTerm", value);
    params.set("page", "1"); // Reset page to 1 on search change
    if (!value) {
      params.delete("searchTerm"); // Clear searchTerm if no value
    }
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handlePagination = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", limit.toString());
    if (searchTerm) {
      params.set("searchTerm", searchTerm); // Keep the searchTerm if set
    } else {
      params.delete("searchTerm"); // Clear searchTerm if not set
    }
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  // Reset all search parameters
  const resetSearchParams = () => {
    const params = new URLSearchParams();
    params.set("page", "1"); // Reset to first page
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">User Management</h2>
        <Button variant="outline" onClick={resetSearchParams}>
          Reset Filters
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            onChange={(e) => handleClickSearchQuery(e.target.value)}
            value={searchTerm}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              userData?.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleClickDeleteUser(user?.id)}
                          className="text-red-600 cursor-pointer"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {userData?.length} of {meta?.total} users
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => handlePagination(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= Math.ceil(meta?.total / limit)}
            onClick={() => handlePagination(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
