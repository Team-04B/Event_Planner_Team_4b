import prisma from "../../app/shared/prisma"

const createReviewIntoDB =async (id:string,data:any)=>{
   const isExist = prisma.event.findUniqueOrThrow({
   where:{
   id
   }
   })
   const result = prisma.review.create({
   data
   })
   return result;
}
const getAllReviewFromDB=async ()=>{
   
   const result = prisma.review.findMany()
   return result;
}

export const ReviewServices={
createReviewIntoDB,
getAllReviewFromDB
}