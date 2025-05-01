import { Event } from '@prisma/client';
import prisma from '../../app/shared/prisma';
import { paginationHelper } from '../../app/helper/paginationHelper';
import { IPaginationOptions } from '../../app/interface/pagination';

const createEventIntoDB = async (payload: Event) => {
  const result = await prisma.event.create({
    data: payload,
  });
  return result;
};

const getEventsFromDB = async (options: IPaginationOptions) => {
  const { page, limit } = paginationHelper.calculatePagination(options);
  const result = await prisma.event.findMany();

  const total = await prisma.event.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const EventService = {
  createEventIntoDB,
  getEventsFromDB,
};
