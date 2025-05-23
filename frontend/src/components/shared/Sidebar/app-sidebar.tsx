/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  CalendarDays,
  Clock,
  MessageSquare,
  Plus,
  SquareTerminal,
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
import { useAppSelector } from "@/redux/hook";
import { currentUser } from "@/redux/userSlice/userSlice";
import Image from "next/image";
import { LogoutModal } from "@/components/modules/Login/LogoutModal";
import logo from "../../../../public/images/logo.png";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard/user-overview",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "My Event",
      url: "/dashboard/my-events",
      icon: CalendarDays,
    },
    {
      title: "My Invitaions",
      url: "/dashboard/myinvitaions",
      icon: UserPlus,
    },
    {
      title: "Participation Request",
      url: "/dashboard/participation",
      icon: Clock,
    },
    {
      title: "My Reviews",
      url: "/dashboard/reviews",
      icon: MessageSquare,
    },
    {
      title: "Invite People",
      url: "/dashboard/invitations",
      icon: UserPlus,
    },
  ],
};

const adminItem = [
  {
    title: "Overview",
    url: "/dashboard/admin",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "All User",
    url: "/dashboard/admin/users",
    icon: CalendarDays,
  },
  {
    title: "All Events",
    url: "/dashboard/admin/events",
    icon: CalendarDays,
  },
];
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  name: string;
}
export function AppSidebar({  ...props }: AppSidebarProps) {
  const user = useAppSelector(currentUser);

  const userRole = {
    ADMIN: "ADMIN",
    USER: "USER",
  };

  let sidebarItem: any = [];
  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItem = adminItem;
      break;
    case userRole.USER:
      sidebarItem = data.navMain;
      break;

    default:
      break;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard/profile">
              <div className=" mb-3 pl-2 flex items-center gap-3">
                {/* <Image
                  className="rounded-lg"
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  width={35}
                  height={25}
                  alt="profile image"
                /> */}
                {/* <h2 className="font-medium">{name || "Not found"}</h2> */}
                <Link className="mx-auto" href={"/"}>
                  <div className="flex gap-2 mx-auto items-center">
                    <Image
                      className="rounded-full"
                      height={40}
                      width={40}
                      alt="website_logo"
                      src={logo}
                    />
                    <h2 className="font-bold text-2xl mx-auto text-center">
                      EvenT<span className="text-orange-600">ora</span>
                    </h2>
                  </div>
                </Link>
              </div>
            </Link>
            {user?.role === "USER" && (
              <SidebarMenuButton className="mx-auto w-full px-8 flex">
                <Link href="/dashboard/create-event">
                  <h2 className="flex text-center gap-1">
                    <Plus fontSize={700} size={20} /> Create Event
                  </h2>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="mx-auto">
        <NavMain items={sidebarItem} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutModal />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
