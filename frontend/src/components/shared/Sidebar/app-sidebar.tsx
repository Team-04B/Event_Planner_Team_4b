"use client";

import * as React from "react";
import {
  Bot,
  CalendarDays,
  Clock,
  Frame,
  HeartPulse,
  LifeBuoy,
  ListOrdered,
  Map,
  MessageSquare,
  PieChart,
  Plus,
  Send,
  Settings,
  SquareTerminal,
  User,
  UserPlus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { useAppSelector } from "@/redux/hook";
import { currentUser } from "@/redux/userSlice/userSlice";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "My Event",
      url: "/dashboard/myevent",
      icon: CalendarDays,
    },
    {
      title: "Pending Invitations",
      url: "/dashboard/pendinginvitations",
      icon: Clock,
    },
    {
      title: "My Reviews",
      url: "/dashboard/reviews",
      icon: MessageSquare,
    },
    {
      title: "Invite People",
      url: "/dashboard/invite",
      icon: UserPlus,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(currentUser);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h2 className="font-bold text-xl">EvenTora</h2>
              </div>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Link href="/dashboard/createevent">
                <h2 className="flex items-center gap-1">
                  {" "}
                  <Plus fontSize={700} size={20} /> Create Event
                </h2>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser />
      </SidebarFooter> */}
    </Sidebar>
  );
}
