
export type ActivityType = "NEW_EVENT" | "UPDATE_EVENT" | "DELETE_EVENT"; // example enum values, adjust as per your backend
export type ActivityAction = "Created" | "Updated" | "Deleted"; // example values

export type Activity = {
  id: string;
  type: ActivityType;
  action: ActivityAction;
  description: string;
  createdAt: string; // ISO string
  user?: {
    name: string;
  } | null;
};
