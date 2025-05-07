"use server";

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



// create by mydul islam mahim

// get all event 

export const getAllEvents= async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/events`, {
      method: "GET",
      credentials: "include",
    },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};


