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
import { useAppSelector } from "@/redux/hook";
import { currentToken, currentUser } from "@/redux/userSlice/userSlice";
import Image from "next/image";
import { LogoutModal } from "@/components/modules/Login/LogoutModal";

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
      url: "/dashboard/my-events",
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
      url: "/dashboard/invitations",
      icon: UserPlus,
    },
  ],
};

const adminItem = [
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
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(currentUser);
  const token = useAppSelector(currentToken);
  const [userdata, setData] = React.useState<any>(null);
  console.log(userdata, token);
  React.useEffect(() => {
    if (!user?.id || !token) return;
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data?.data));
  }, [user?.id, token]);
  const userRole = {
    ADMIN: "USER",
    USER: "ADMIN",
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
            <div className=" mb-3 pl-2 flex items-center gap-3">
              <Image
                className="rounded-lg"
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                width={35}
                height={25}
                alt="profile image"
              />
              <h2 className="font-medium">
                {userdata?.name ? userdata?.name : "Not found"}
              </h2>
            </div>
            {user?.role === "USER" && (
              <SidebarMenuButton>
                <Link href="/dashboard/createevent">
                  <h2 className="flex items-center gap-1">
                    {" "}
                    <Plus fontSize={700} size={20} /> Create Event.
                  </h2>
                </Link>
                ;
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
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
