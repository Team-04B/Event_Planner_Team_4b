
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
