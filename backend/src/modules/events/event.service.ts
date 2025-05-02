import { Event, Prisma } from '@prisma/client';
import prisma from '../../app/shared/prisma';
import { paginationHelper } from '../../app/helper/paginationHelper';
import { IPaginationOptions } from '../../app/interface/pagination';
import { eventSearchableFields } from './event.constant';
import { IEventFilterRequest, IEventUpdate } from './event.interface';
import ApiError from '../../app/error/ApiError';
import httpStatus from 'http-status';

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

const deleteEventFromDB = async (id: string): Promise<Event> => {
  return await prisma.$transaction(async (transactionClient) => {
    const isEventExists = await transactionClient.event.findUnique({
      where: { id },
    });

    if (!isEventExists) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }

    await transactionClient.participation.deleteMany({
      where: {
        eventId: id,
      },
    });

    await transactionClient.invitation.deleteMany({
      where: {
        eventId: id,
      },
    });
    await transactionClient.review.deleteMany({
      where: {
        eventId: id,
      },
    });
    await transactionClient.payment.deleteMany({
      where: {
        eventId: id,
      },
    });

    // Finally delete the event
    const deleteEvent = await transactionClient.event.delete({
      where: {
        id,
      },
    });

    return deleteEvent;
  });
};

const joinPublicEvent = async (eventId: string, userId: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  if (!event.isPublic || event.isPaid) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This is not a public free event'
    );
  }

  const alreadJoined = await prisma.participation.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  if (alreadJoined) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already joined');
  }

  const createParticipation = await prisma.participation.create({
    data: {
      userId,
      eventId,
      status: 'APPROVED',
    },
  });

  return createParticipation;
};

const joinPaidEvent = async (eventId: string, userId: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }

  if (!event.isPaid || !event.isPublic) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This is not a paid event');
  }

  const alreadJoined = await prisma.participation.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  if (alreadJoined) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already joined');
  }

  const createParticipation = await prisma.participation.create({
    data: {
      userId,
      eventId,
      status: 'PENDING',
    },
  });

  return createParticipation;
};

export const EventService = {
  createEventIntoDB,
  getEventsFromDB,
  getEventByIdFromDB,
  updateEventIntoDB,
  deleteEventFromDB,
  joinPublicEvent,
  joinPaidEvent,
};
