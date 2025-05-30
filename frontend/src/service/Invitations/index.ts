/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { getValidToken } from "@/lib/verifyToken";
import { cookies } from "next/headers";

// export const GetAllBlog = async () => {
//   try {

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next:{
//       tags:["blogs"]
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`Request failed with status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fblog get:", error);
//     return null;
//   }
// };

// export const SingleBlog = async (id:string) => {
//   try {

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Request failed with status: ${response.status}`);
//     }
//     console.log(response)

//     return await response.json();
//   } catch (error) {
//     console.error("Error single blog get:", error);
//     return null;
//   }
// };

export const CreateInvitaion = async (data: any) => {
  const token = await getValidToken();
  try {
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

export const getAllInvitaions = async (page:any, limit:any) => {
  const token = await getValidToken();
  try {
    if (!token) {
      throw new Error("Access token not found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/invitations?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      credentials: "include",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getSingleInvitaion= async (id:string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Access token not found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/invitations/invitaion/${id}`, {
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
// get all Invitation 

export const getAllSentInvitaions= async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Access token not found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/invitations/sent-invitaions`, {
      method: "GET",
      headers: {
        Authorization: token
      },
      credentials: "include",
    },
    );
    const result = await res.json();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const AcceptInvitaon= async (id:string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Access token not found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/invitations/invitaion/${id}/accept`, {
      method: "PUT",
      headers: {
        Authorization: token
      },
      credentials: "include",
    },
    );
    const result = await res.json();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const DeclineInvitaion= async (id:string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Access token not found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/invitations/invitaion/${id}/decline`, {
      method: "PUT",
      headers: {
        Authorization: token
      },
      credentials: "include",
    },
    );
    const result = await res.json();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  }
};

  
