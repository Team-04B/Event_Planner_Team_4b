/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

// Create Event
export const createEvent = async (eventData: FormData) => {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;

    if (!accessToken) throw new Error("No access token found in cookies.");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/events`, {
      method: "POST",
      body: eventData,
      headers: {
        Authorization: accessToken,
      },
      credentials: "include",
    });

    revalidateTag("EVENT");
    return await res.json();
  } catch (error: any) {
    console.error("Event creation error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

// Get All Events
export const getAllEvents = async (filters = {}) => {
  try {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) query.append(key, String(value));
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/events/all${
      query.toString() ? `?${query.toString()}` : ""
    }`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error(`API request failed with status ${res.status}`);
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
      data: { all: [], completed: [], upcoming: [], paginatedData: [] },
      meta: { page: 1, limit: 10, total: 0 },
    };
  }
};

// Get Events by User
export const getAllEventsByUserId = async (filters = {}) => {
  try {
    const token = await getValidToken();
    if (!token) throw new Error("No access token found.");
    console.log(filters, "asdfsdf");
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, String(value));
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/events${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: token },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error(`API request failed with status ${res.status}`);
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
      data: { all: [], completed: [], upcoming: [], paginatedData: [] },
      meta: { page: 1, limit: 10, total: 0 },
    };
  }
};

// Get Event by ID
export const getEventById = async (eventId: string) => {
  try {
    const token = await getValidToken();
    if (!token) throw new Error("No access token found.");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/events/${eventId}`,
      {
        method: "GET",
        headers: { Authorization: token },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok)
      throw new Error(`API request failed with status ${res.status}`);
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};

// Update Event
export const updateEvent = async (eventId: string, eventData: FormData) => {
  try {
    const token = await getValidToken();
    if (!token) throw new Error("No access token found.");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/events/${eventId}`,
      {
        method: "PATCH",
        headers: { Authorization: token },
        body: eventData,
        credentials: "include",
      }
    );

    if (!res.ok)
      throw new Error(`API request failed with status ${res.status}`);
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
};

// Delete Event
export const deleteEvent = async (eventId: string) => {
  try {
    const token = await getValidToken();
    if (!token) throw new Error("No access token found.");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/events/${eventId}`,
      {
        method: "DELETE",
        headers: { Authorization: token },
        credentials: "include",
      }
    );

    if (!res.ok)
      throw new Error(`API request failed with status ${res.status}`);
    return await res.json();
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
};

// Join Public Event
export const joinPublicEvent = async (eventId: string) => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  if (!accessToken) throw new Error("No access token found in cookies.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/events/${eventId}/join`,
    {
      method: "POST",
      headers: { Authorization: accessToken },
      credentials: "include",
    }
  );

  return await res.json();
};

// Request Private Event
export const requestPrivateEvent = async (eventId: string) => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  if (!accessToken) throw new Error("No access token found in cookies.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/events/${eventId}/request`,
    {
      method: "POST",
      headers: { Authorization: accessToken },
      credentials: "include",
    }
  );

  return await res.json();
};

// Get Participation Status (Client-side)
export const getParticipationStatus = async (eventId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/events/${eventId}/participation-status`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const result = await res.json();
  return result.data as "PENDING" | "APPROVED" | null;
};

export const getAllDataForDb = async () => {
  const token = await getValidToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/events/dashboard-data`,

    {
      method: "GET",
      credentials: "include",
      headers: { Authorization: token },
    }
  );
  const result = await res.json();
  return result;
};
export const adminDeleteEvent = async (id: string) => {
  const token = await getValidToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/events/admin-delete-event/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { Authorization: token },
    }
  );
  revalidateTag("EVENT");
  const result = await res.json();
  return result;
};
