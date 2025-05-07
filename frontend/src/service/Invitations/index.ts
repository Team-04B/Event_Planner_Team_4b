"use server"
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

  