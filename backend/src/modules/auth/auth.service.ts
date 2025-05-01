import { User } from "@prisma/client"
import prisma from "../../app/shared/prisma"
import ApiError from "../../app/error/ApiError";
import httpStatus from "http-status";

const authRegisterInToDB = async(payload:Partial<User>) => {
     const { name, email, password } = payload;

     // Optional: Add validation checks here
     if (!name || !email || !password ) {
         throw new ApiError(httpStatus.NON_AUTHORITATIVE_INFORMATION,"Missing required fields");
     }
 
     const registeredUser = await prisma.user.create({
         data: {
         name,
         email,
         password,
         },
     });

  return registeredUser;
};

export const AuthService = {
    authRegisterInToDB
}