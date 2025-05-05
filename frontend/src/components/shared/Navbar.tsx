"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "invitation" | "reminder" | "update"
  eventId?: string
}

export default function Navbar() {
  const isMobile = useMobile()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Event Invitation",
      message: "John invited you to 'Tech Conference 2025'",
      time: "5 min ago",
      read: false,
      type: "invitation",
      eventId: "event-123",
    },
    {
      id: "2",
      title: "Event Invitation",
      message: "Sarah invited you to 'Team Building Workshop'",
      time: "1 hour ago",
      read: false,
      type: "invitation",
      eventId: "event-456",
    },
    {
      id: "3",
      title: "Reminder",
      message: "Your event 'Team Meeting' starts in 1 hour",
      time: "3 hours ago",
      read: true,
      type: "reminder",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    
  }

  const markAllAsRead = () => {
  
  }

  const handleAcceptInvitation = (id: string, eventId: string) => {}

  const handleDeclineInvitation = (id: string, eventId: string) => {
  }

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b">
      <Link href="/" className="text-xl font-bold">
        EvenTora
      </Link>

      {isMobile ? (
        <div className="flex items-center gap-2">
          <NotificationsMobile
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            handleAcceptInvitation={handleAcceptInvitation}
            handleDeclineInvitation={handleDeclineInvitation}
          />
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
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/events" className="text-lg font-medium">
                  Events
                </Link>
                <Button variant="outline" className="justify-start">
                 <Link href={'/login'} >Login</Link>
                </Button>
                <Button className="justify-start"><Link  href={'/register'}>Sign in</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/events" className="text-sm font-medium">
            Events
          </Link>
          <Button variant="outline" className="justify-start">
                 <Link href={'/login'} >Login</Link>
                </Button>
                <Button className="justify-start"><Link  href={'/register'}>Sign in</Link></Button>
          <NotificationsDesktop
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            handleAcceptInvitation={handleAcceptInvitation}
            handleDeclineInvitation={handleDeclineInvitation}
          />
        </div>
      )}
    </nav>
  )
}

function NotificationsDesktop({
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  handleAcceptInvitation,
  handleDeclineInvitation,
}: {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  handleAcceptInvitation: (id: string, eventId: string) => void
  handleDeclineInvitation: (id: string, eventId: string) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b last:border-0 ${notification.read ? "" : "bg-slate-50"}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>

                {notification.type === "invitation" && !notification.read && notification.eventId && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      className="h-8 "
                      onClick={() => handleAcceptInvitation(notification.id, notification.eventId!)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 "
                      onClick={() => handleDeclineInvitation(notification.id, notification.eventId!)}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function NotificationsMobile({
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  handleAcceptInvitation,
  handleDeclineInvitation,
}: {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  handleAcceptInvitation: (id: string, eventId: string) => void
  handleDeclineInvitation: (id: string, eventId: string) => void
}) {
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
      <SheetContent side="right">
        <div className="flex items-center justify-between border-b pb-3 mt-6">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
              Mark all as read
            </Button>
          )}
        </div>
        <div className="mt-4 space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className={`p-3 border rounded-lg ${notification.read ? "" : "bg-slate-50"}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>

                {notification.type === "invitation" && !notification.read && notification.eventId && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      className="h-8 "
                      onClick={() => handleAcceptInvitation(notification.id, notification.eventId!)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 "
                      onClick={() => handleDeclineInvitation(notification.id, notification.eventId!)}
                    >
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
