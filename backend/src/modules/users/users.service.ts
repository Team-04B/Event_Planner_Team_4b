import { User } from '@prisma/client';
import prisma from '../../app/shared/prisma';

const getAllUsersInToDb = async () => {
  const result = await prisma.user.findMany({
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
