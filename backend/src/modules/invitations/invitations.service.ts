import { Invitation } from '@prisma/client';
import prisma from '../../app/shared/prisma';
import { IPaginationOptions } from '../../app/interface/pagination';
import { paginationHelper } from '../../app/helper/paginationHelper';

// create Invitaion
const createInvitaionDB = async (id: string, data: Invitation) => {
  console.log(id, data.userId);
  await prisma.event.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.invitation.create({
    data: {
      userId: data?.userId,
      eventId: id,
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
  id: string
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  const result = await prisma.invitation.findMany({
    where: {
      userId: id,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.invitation.count({
    where: {
      userId: id,
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
