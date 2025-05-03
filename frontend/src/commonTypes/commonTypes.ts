export type TReactChildrenType ={children:React.ReactNode}  

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  iat?: number;
  exp?: number;
}
