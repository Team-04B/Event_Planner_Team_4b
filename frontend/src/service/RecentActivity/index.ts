import { Activity } from "@/types/activity";


export const getRecentActivities = async (
  limit: number = 5
): Promise<Activity[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/activities/recent?limit=${limit}`,
    {
      method: "GET",
      cache: "no-store", // prevent stale data
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch recent activities: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data as Activity[];
};
