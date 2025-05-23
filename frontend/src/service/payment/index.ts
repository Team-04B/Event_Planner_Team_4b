"use server";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CreatePayment = async (eventId: any) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Access token not found");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/initpayment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ eventId }),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error payment request Send:", error);
    return null;
  }
};

export const getDashboardOverview = async () => {
  try {
    const cookiesList = await cookies();
    const token = cookiesList.get("accessToken")?.value;
    if (!token) throw new Error("Access token not found");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/dashboard`,
      {
        method: "GET",
        headers: { Authorization: token },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch dashboard overview. Status: ${res.status}. Response: ${errorText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[Dashboard Overview Error]", error);
    return null;
  }
};
