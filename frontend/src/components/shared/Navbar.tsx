"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { DialogTitle } from "@/components/ui/dialog"
import { useAppSelector } from "@/redux/hook"
import { currentUser, logOut } from "@/redux/userSlice/userSlice"
import { getAllInvitaions } from "@/service/Invitations"
import { logout } from "@/service/AuthService"
import { useDispatch } from "react-redux"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "invitation" | "reminder" | "update"
  eventId: string
  status: string
  paid: boolean
  venue?: string
  date?: string
}

export default function Navbar() {
  const user = useAppSelector(currentUser)
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [invitations, setInvitations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dispatch = useDispatch()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    dispatch(logOut())
  }

  useEffect(() => {
    const fetchInvitations = async () => {
      if (!user) return

      setIsLoading(true)
      try {
        const invitationData = await getAllInvitaions(null, null)
        setInvitations(invitationData?.data?.data || [])
      } catch (error) {
        console.error("Error fetching invitations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvitations()
  }, [user])

  useEffect(() => {
    if (!user) {
      // Redirect to login or home if user is not authenticated
      router.push("/login") // or router.push("/") for homepage
    }
  }, [user, router])
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const notifications = invitations.map((invitation) => ({
    id: invitation.id,
    title: `Event Invitation: ${invitation.event.title}`,
    message: invitation.invitationNote || `You've been invited to ${invitation.event.title}`,
    time: new Date(invitation.createdAt).toLocaleDateString(),
    read: false,
    type: "invitation" as const,
    eventId: invitation.eventId,
    status: invitation.status,
    paid: invitation.paid,
    venue: invitation.event.venue,
    date: new Date(invitation.event.dateTime).toLocaleDateString(),
  }))

  const isMobile = useMobile()
  const unreadCount = notifications.filter((n) => n.status === "PENDING").length

  return (
    <nav
      className={`w-full py-4 px-6 flex items-center justify-between border-b z-50 transition-all duration-300 ${
        scrolled ? "fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm" : "relative bg-white"
      }`}
    >
      <Link href="/" className="text-xl font-bold">
        EvenTora
      </Link>

      {isMobile ? (
        <div className="flex items-center gap-3">
          {user && (
            <NotificationsMobile notifications={notifications} unreadCount={unreadCount} isLoading={isLoading} />
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4">
              <VisuallyHidden>
                <DialogTitle>Navigation Menu</DialogTitle>
              </VisuallyHidden>
              <div className="flex flex-col gap-4 mt-4">
                <Link
                  href="/"
                  className={`text-lg font-medium transition-colors ${
                    pathname === "/"
                      ? "text-black font-bold border-l-4 border-primary pl-2"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/events"
                  className={`text-lg font-medium transition-colors ${
                    pathname === "/events"
                      ? "text-black font-bold border-l-4 border-primary pl-2"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  Events
                </Link>
                <Link
                  href="/about"
                  className={`text-lg font-medium transition-colors ${
                    pathname === "/about"
                      ? "text-black font-bold border-l-4 border-primary pl-2"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  About
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className={`text-lg font-medium transition-colors ${
                        pathname?.startsWith("/dashboard")
                          ? "text-black font-bold border-l-4 border-primary pl-2"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Button onClick={handleLogout} variant="outline" className="justify-start">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="justify-start">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button className="justify-start">
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-black font-bold border-b-2 border-primary" : "text-gray-500 hover:text-black"
            }`}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={`text-sm font-medium transition-colors ${
              pathname === "/events"
                ? "text-black font-bold border-b-2 border-primary"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Events
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "text-black font-bold border-b-2 border-primary"
                : "text-gray-500 hover:text-black"
            }`}
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  pathname?.startsWith("/dashboard")
                    ? "text-black font-bold border-b-2 border-primary"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Dashboard
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
              <NotificationsDesktop notifications={notifications} unreadCount={unreadCount} isLoading={isLoading} />
            </>
          ) : (
            <>
              <Button variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm">
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

interface NotificationsDesktopProps {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
}

function NotificationsDesktop({ notifications, unreadCount, isLoading }: NotificationsDesktopProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-medium">Invitations</h3>
        </div>
        <div className="max-h-80 overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center">Loading invitations...</div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b last:border-0 ${notification.read ? "" : "bg-slate-50"} hover:bg-slate-100 transition-colors`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

                <div className="mt-2 text-xs flex flex-wrap gap-2 mb-2">
                  {notification.venue && (
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {notification.venue}
                    </span>
                  )}

                  {notification.date && (
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      {notification.date}
                    </span>
                  )}
                </div>

                <Link
                  href={`/dashboard/myinvitaions/${notification?.id}`}
                  className="inline-block text-xs font-medium text-primary hover:underline transition-colors"
                >
                  View Invitation Details →
                </Link>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No invitations found</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface NotificationsMobileProps extends NotificationsDesktopProps {}

function NotificationsMobile({ notifications, unreadCount, isLoading }: NotificationsMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto p-4">
        <VisuallyHidden>
          <DialogTitle>Notifications</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-medium text-lg">Invitations</h3>
        </div>
        <div className="mt-4 space-y-3">
          {isLoading ? (
            <div className="p-4 text-center">Loading invitations...</div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border rounded-lg ${notification.read ? "" : "bg-slate-50"} hover:bg-slate-100 transition-colors`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

                <div className="mt-2 text-xs flex flex-wrap gap-2 mb-2">
                  {notification.venue && (
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {notification.venue}
                    </span>
                  )}

                  {notification.date && (
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      {notification.date}
                    </span>
                  )}
                </div>

                <Link
                  href={`/dashboard/myinvitaions/${notification?.id}`}
                  className="inline-block text-xs font-medium text-primary hover:underline transition-colors"
                >
                  View Invitation Details →
                </Link>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No invitations found</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
