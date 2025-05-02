import { Review } from "@prisma/client";
import prisma from "../../app/shared/prisma"


// create reviews for each event 
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
 
//  update reviews 
const updateReviewIntoDB =async (id:string,data:Review)=>{
console.log(id,data)
await prisma.review.findUniqueOrThrow({
    where:{
    id
    }
    })
 const result = await prisma.review.update({
  where:{
  id
  },
  data
 })
    return result;
 }
 
  //  get all reviews for each event 
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
getAllReviewFromDB,
updateReviewIntoDB
}