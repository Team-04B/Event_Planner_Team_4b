"use server"
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CreatePayment= async (eventId:any) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
      if (!token) {
        throw new Error("Access token not found");
      }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/initpayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ eventId }),
      })
    return await response.json();
  } catch (error) {
    console.error("Error payment request Send:", error);
    return null;
  }
};
