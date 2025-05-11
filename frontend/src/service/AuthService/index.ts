/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    console.log("user result", result);

    return result;
  } catch (error: any) {
    console.error("Register error:", error);
    return { success: false, message: error.message };
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success && result?.data?.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }

    return result;
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: error.message };
  }
};
export const chengePassword = async (userData: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/cheange-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: error.message };
  }
};
export const getMeFoDb = async () => {
  const token = await getValidToken();
  const user = jwtDecode(token) as any;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    const decodedData = jwtDecode(accessToken);
    return decodedData;
  }
  return null;
};

export const reCaptchaTokenVerification = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
        response: token,
      }),
    });

    return res.json();
  } catch (err: any) {
    console.error("reCaptcha error:", err);
    return { success: false, message: err.message };
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
