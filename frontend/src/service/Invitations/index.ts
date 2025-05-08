/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from "next/headers";


export const CreateInvitaion = async (data:any) => {
console.log(data)
  try {
    const token = (await cookies()).get("accessToken")?.value;
  console.log({token})
      if (!token) {
        throw new Error("Access token not found");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/events/${data?.eventId}/invite`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), 
        }
      );

    // if (!response.ok) {
    //   throw new Error(`Request failed with status: ${response.status}`);
    // }

    return await response.json();
  } catch (error) {
    console.error("Error blog post:", error);
    return null;
  }
};



// get all Invitation 

export const getAllInvitaions= async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Access token not found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/invitations`, {
      method: "GET",
      headers: {
        Authorization: token
      },
      credentials: "include",
    },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

  