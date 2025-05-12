"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getSingleUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (query: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (query?.searchTerm) {
    params.append("searchTerm", query.searchTerm.toString());
  }
  if (query?.page) {
    params.append("page", query.page.toString());
  }
  if (query?.limit) {
    params.append("limit", query.limit.toString());
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users?${params.toString()}`,
      {
        next: { tags: ["get-users"] },
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  console.log(token);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    revalidateTag("get-users");
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
