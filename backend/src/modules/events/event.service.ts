import { Event, Prisma } from '@prisma/client';
import prisma from '../../app/shared/prisma';
import { paginationHelper } from '../../app/helper/paginationHelper';
import { IPaginationOptions } from '../../app/interface/pagination';
import { eventSearchableFields } from './event.constant';
import { IEventFilterRequest, IEventUpdate } from './event.interface';

const createEventIntoDB = async (payload: Event) => {
  const result = await prisma.event.create({
    data: payload,
  });
  return result;
};

const getEventsFromDB = async (
  filters: IEventFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.EventWhereInput[] = [];

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

  const whereConditions: Prisma.EventWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.event.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.event.count({
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

const getEventByIdFromDB = async (id: string): Promise<Event | null> => {
  const result = await prisma.event.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateEventIntoDB = async (id: string, data: Partial<Event>) => {
  await prisma.event.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.event.update({
    where: { id },
    data,
  });
  return result;
};




export const EventService = {
  createEventIntoDB,
  getEventsFromDB,
  getEventByIdFromDB,
  updateEventIntoDB,
};
