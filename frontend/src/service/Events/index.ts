/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create event
export const createEvent = async (
  eventData: FormData,
  token: string | null
) => {
  try {
    if (!token) {
      throw new Error("No access token found in cookies.");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/events`, {
      method: "POST",
      body: eventData,
      credentials: "include",
      headers: {
        Authorization: token,
      },
    });

    revalidateTag("EVENT");
    return res.json();
  } catch (error: any) {
    console.error("Event creation error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

export const getAllEventsByUserId = async (filters = {}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("No access token found in cookies.");
    }

    // Convert filters object to URL query parameters
    const queryParams = new URLSearchParams();

    // Add each filter to the query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, String(value));
      }
    });

    // Build the URL with query parameters
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/events${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    // console.log("Fetching events with URL:", url)

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
      credentials: "include",
      cache: "no-store", // Ensure we don't cache the results
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    // console.error("Event fetch error:", error)
    return {
      success: false,
      error: error.message || "Unknown error",
      data: {
        all: [],
        completed: [],
        upcoming: [],
        paginatedData: [],
      },
      meta: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("No access token found in cookies.");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/events/${eventId}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
        credentials: "include",
        cache: "no-store", // Ensure we don't cache the results
      }
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Event fetch error:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
      data: null,
    };
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("No access token found in cookies.");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: accessToken,
        },
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Event deletion error:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
};

export const getAllEvents = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  console.log(token);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/events`, {
      next: { tags: ["EVENT"] },
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
