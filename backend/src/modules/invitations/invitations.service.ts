import { Invitation, Review } from "@prisma/client";
import prisma from "../../app/shared/prisma"


// create Invitaion 
const createInvitaionDB =async (id:string,data:Invitation)=>{
 await prisma.event.findUniqueOrThrow({
       where:{
       id
       }
       })
       
       
    const result =await prisma.invitation.create({
    data:{
      userId:data?.userId,
      eventId:id
    }
    })
    
    return result;
 }
// get all Invitaion 
const getAllInvitaionDB =async (id:string,data:Invitation)=>{
    const result =await prisma.invitation.findMany()
    return result;
 }
 

export const InvitaionServices={
createInvitaionDB,
getAllInvitaionDB
}