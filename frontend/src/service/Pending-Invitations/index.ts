"use server";

import { cookies } from "next/headers";

export const getMyPendingInvitations = async (): Promise<
  ParticipationWithEvent[]
> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("No access token found in cookies.");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/participants/participation-status`,
    {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch pending invitations");
  }

  return res.json();
};

// Type definition for clarity
export type ParticipationWithEvent = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "BANNED";
  userId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  event: {
    id: string;
    title: string;
    dateTime: string;
    eventImgUrl: string;
    venue: string;
    isPublic: boolean;
    isPaid: boolean;
    fee?: number;
  };
};

export const respondToParticipation = async (
  id: string,
  status: "APPROVED" | "REJECTED" | "BANNED"
): Promise<ParticipationWithEvent> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("No access token found in cookies.");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/participants/${id}/status`,
    {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
      credentials: "include",
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to respond to invitation");
  }

  return res.json();
};
