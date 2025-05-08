import { Invitation } from '@prisma/client';
import prisma from '../../app/shared/prisma';
import { IPaginationOptions } from '../../app/interface/pagination';
import { paginationHelper } from '../../app/helper/paginationHelper';

// create Invitaion
const createInvitaionDB = async (id: string, data: any) => {
console.log(id,{data})
  await prisma.event.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.invitation.create({
    data: {
      eventId: id,
      userEmail: data.userEmail,
      paid: data?.paid,
      status: data?.status,
      invitationNote:data?.invitationNote
    },
  });

  return result;
};
//  const getMyAllnvitaionsFromDB =async (id:string)=>{
//      const result = await prisma.invitation.findMany({
//      where:{
//      userId:id
//      }
//      })

//      return result;
//  }
const getMyAllnvitaionsFromDB = async (
  options: IPaginationOptions,
  email: string
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  const result = await prisma.invitation.findMany({
    where: {
      userEmail: email,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
          include: {
            event: true, 
            invitedUser:true
          },
  });

  const total = await prisma.invitation.count({
    where: {
      userEmail: email,
    },
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

export const InvitaionServices = {
  createInvitaionDB,
  getMyAllnvitaionsFromDB,
};
