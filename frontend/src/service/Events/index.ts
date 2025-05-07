"use server";

import { error } from "console";
import { revalidateTag } from "next/cache";

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
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyNmFkNmQ0LWI0MzktNDE2Yy05NGYxLTE4ZWEyMWYyYTZjZSIsImVtYWlsIjoibTFAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDY2MDYwNDYsImV4cCI6MTc0NjYwNjM0Nn0.SGNGQ2LBez2TVddDYvUKPH_hI3S3UFT4nL5p5HAUHho",
      },
    });

    revalidateTag("EVENT");
    return res.json();
  } catch (error: any) {
    console.error("Event creation error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};
