import { Invitation, Prisma } from '@prisma/client';
import prisma from '../../app/shared/prisma';
import { paginationHelper } from '../../app/helper/paginationHelper';
import { IPaginationOptions } from '../../app/interface/pagination';

// respond invitation
const respondToInvitation = async (id: string, data: Partial<Invitation>) => {
  await prisma.invitation.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.invitation.update({
    where: { id },
    data,
  });
  return result;
};

const getPendingParticipations = async (
  filters: { searchTerm?: string; paid?: string },
  options: IPaginationOptions,
  userId:string
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, paid } = filters;
  // const user = await prisma.user.findUnique({
  //   where:{
  //     id:userId
  //   },
  //   include:{
  //     events:true
  //   }
  // })

  const andConditions: Prisma.ParticipationWhereInput[] = [
   {
      status: 'PENDING',
    },
    {
      event:{
        creatorId:userId
      }
    }
  ];
  // andConditions.push({
  //   user:{
  //     id:userId
  //   }
  // })

  // Search term filter (user.name, user.email, event.title)
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          user: {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          event: {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    });
  }

  // Paid filter
  if (paid === 'true' || paid === 'false') {
    andConditions.push({
      paid: paid === 'true',
    });
  }

  const whereCondition: Prisma.ParticipationWhereInput = {
    AND: andConditions,
  };

  const participations = await prisma.participation.findMany({
    where: whereCondition,
    include: {
      user: true,
      event: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'desc' },
    skip,
    take: limit,
  });

  const total = await prisma.participation.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: participations,
  };
};


export const ParticipationService = {
  respondToInvitation,
  getPendingParticipations
};
