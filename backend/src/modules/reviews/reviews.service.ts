import { Review } from "@prisma/client";
import prisma from "../../app/shared/prisma"

const createReviewIntoDB =async (id:string,data:Review)=>{
  const isExist =await prisma.event.findUniqueOrThrow({
    where:{
    id
    }
    })
    
    const result =await prisma.review.create({
    data:{
      userId:data?.userId,
      rating:data.rating,
      comment:data?.comment,
      eventId:id
    }
    })
    return result;
 }

const getAllReviewFromDB=async (id:string)=>{
   
   const result = prisma.review.findMany({
   where:{
   eventId:id
   }
   })
   return result;
}

export const ReviewServices={
createReviewIntoDB,
getAllReviewFromDB
}