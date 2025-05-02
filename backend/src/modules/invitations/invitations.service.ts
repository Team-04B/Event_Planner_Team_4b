import { Invitation, Prisma, Review } from "@prisma/client";
import prisma from "../../app/shared/prisma"
import { IEventFilterRequest } from "../events/event.interface";
import { IPaginationOptions } from "../../app/interface/pagination";
import { paginationHelper } from "../../app/helper/paginationHelper";
import { eventSearchableFields } from "../events/event.constant";
import { IInvitaionsFilterRequest } from "./invitations.interface";


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
// delete  Invitaion 
const deleteInvitaionDB =async (id:string)=>{
 await prisma.invitation.findUniqueOrThrow({
       where:{
       id
       }
       })
       
       
    const result =await prisma.invitation.delete({
    where:{
    id
    }
    })
    
    return result;
 }
// get all Invitaion 

const getAllInvitaionDB = async (
  filters: IInvitaionsFilterRequest,
  options: IPaginationOptions,id:string
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.InvitationWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: eventSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.InvitationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.invitation.findMany({
    where:{
      ...whereConditions,
      id, 
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  },
  );

  const total = await prisma.invitation.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
 

export const InvitaionServices={
createInvitaionDB,
getAllInvitaionDB,
deleteInvitaionDB
}