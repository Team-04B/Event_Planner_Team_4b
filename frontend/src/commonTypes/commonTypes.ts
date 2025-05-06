export type TReactChildrenType ={children:React.ReactNode}  

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  iat?: number;
  exp?: number;
}
// Types based on the Prisma schema


export type User = {
  id: string
  name: string
  email: string
}
export type IEvent = {
  id: string
  title: string
  description: string
  dateTime: Date
  eventImgUrl: string
  venue: string
  isPublic: boolean
  isPaid: boolean
  fee: number | null
}

