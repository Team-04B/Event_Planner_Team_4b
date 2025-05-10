import { User } from '@prisma/client';
import prisma from '../../app/shared/prisma';
const getAllUsersInToDb = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  let where: any = undefined;

  if (
    query?.searchTerm &&
    typeof query?.searchTerm === 'string' &&
    query?.searchTerm.trim() !== ''
  ) {
    where = {
      OR: [
        { name: { contains: query?.searchTerm, mode: 'insensitive' } },
        { email: { equals: query?.searchTerm, mode: 'insensitive' } },
      ],
    };
  }

  const result = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    select: {
      name: true,
      email: true,
      id: true,
      role: true,
      updatedAt: true,
    },
  });
  return {
    meta: {
      page,
      limit,
      total: await prisma.user.count({ where }),
    },
    data: result,
  };
};
const getSingleUsersInToDb = async (id: string) => {
  const result = await prisma.user.findFirstOrThrow({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      events: true,
      id: true,
      invitations: true,
      participations: true,
      payments: true,
      createdAt: true,
      reviews: true,
      role: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateUserInToDb = async (id: string, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: { id: id },
    data: payload,
    select: {
      name: true,
      email: true,
      events: true,
      id: true,
      invitations: true,
      participations: true,
      payments: true,
      createdAt: true,
      reviews: true,
      role: true,
      updatedAt: true,
    },
  });

  return result;
};

const deleteUserInToDb = async (id: string) => {
  const result = await prisma.user.delete({ where: { id: id } });
  return result;
};
export const userServices = {
  getAllUsersInToDb,
  getSingleUsersInToDb,
  updateUserInToDb,
  deleteUserInToDb,
};
