"use client"

import * as React from "react"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { logOut } from "@/redux/userSlice/userSlice"
import { logout } from "@/service/AuthService"

export function LogoutModal() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = () => {
    // Dispatch logout action to clear user data and token
    logout()
    dispatch(logOut())

    // Close the modal
    
    // Redirect to login page
    router.push("/login")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start gap-2 px-2 text-left">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>Are you sure you want to logout from your account?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
