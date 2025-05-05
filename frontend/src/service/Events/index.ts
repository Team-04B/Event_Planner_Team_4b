"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create event
export const createEvent = async (eventData: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/events`, {
      method: "POST",
      body: eventData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("EVENT");
    console.log(res);
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
