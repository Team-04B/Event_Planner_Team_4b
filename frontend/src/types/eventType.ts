/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EventFormData {
  title: string;
  description: string;
  date: Date | undefined;
  venue: string;
  publicEvent: boolean;
  paidEvent: boolean;
  image?: File | null;
  fee?: string | number | null;
}
export interface Event {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  eventImgUrl?: string;
  venue: string;
  isPublic: boolean;
  isPaid: boolean;
  fee?: number;
  creatorId: string;
  creator?: {
    name: string;
    email: string;
  };
  [key: string]: any;
}
