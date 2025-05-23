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

export type EventDistributionItem = {
  name: string;
  value: number;
};

export async function getEventDistribution(): Promise<EventDistributionItem[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/admin/event-distribution`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch event distribution");
  }

  const data: EventDistributionItem[] = await response.json();
  return data;
}
