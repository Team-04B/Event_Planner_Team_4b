export type IEventFilterRequest = {
  searchTerm?: string ;
  isPublic?: boolean ;
  isPaid?: boolean;
};


export type IEventUpdate = {
  title?: string;
  description?: string;
  dateTime?: string; // ISO date string
  venue?: string;
  isPublic?: boolean;
  isPaid?: boolean;
  fee?: number | null;
  creatorId?: string;
};
