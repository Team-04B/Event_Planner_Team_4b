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
import { currentToken, currentUser } from "@/redux/userSlice/userSlice";
import Image from "next/image";

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
  const token = useAppSelector(currentToken);
  const [userdata, setData] = React.useState<any>(null);
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
  console.log(userdata);
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
                {userdata?.name ? userdata?.name : "Not Found"}
              </h2>
            </div>

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
