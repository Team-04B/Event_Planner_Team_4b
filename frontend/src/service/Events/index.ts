"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create event
export const createEvent = async (eventData: FormData) => {
  try {
    const cookieStore = await cookies();
    // console.log("Cookies:", cookieStore.getAll());
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("No access token found in cookies.");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/events`, {
      method: "POST",
      body: eventData,
      credentials: "include",
      headers: {
        Authorization: accessToken,
      },
    });

    revalidateTag("EVENT");
    return res.json();
  } catch (error: any) {
    console.error("Event creation error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};
