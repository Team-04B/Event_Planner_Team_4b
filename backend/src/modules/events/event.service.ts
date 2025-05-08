import { Event, Participation, Prisma } from '@prisma/client';
import prisma from '../../app/shared/prisma';
import { paginationHelper } from '../../app/helper/paginationHelper';
import { IPaginationOptions } from '../../app/interface/pagination';
import { eventSearchableFields } from './event.constant';
import { IEventFilterRequest, IEventUpdate } from './event.interface';
import ApiError from '../../app/error/ApiError';
import httpStatus from 'http-status';

// create event into db
const createEventIntoDB = async (payload: Event, creatorId: string) => {
  const result = await prisma.event.create({
    data: {
      ...payload,
      creatorId,
    },
  });
  return result;
};

// getAll events from db

const getAllEventsFromDB = async (
  filters: IEventFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.EventWhereInput[] = [];

  // Search term filter
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

  // Other filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.EventWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Fetch all events
  const allEvents = await prisma.event.findMany({
    where: whereConditions,
    include: {
      creator:true,
      reviews:true,
      invitations:true,
      participations:true
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  // Today's date
  const now = new Date();

  // Segment the events
  const completedEvents = allEvents.filter(
    (event) => new Date(event.dateTime) < now
  );
  const upcomingEvents = allEvents.filter(
    (event) => new Date(event.dateTime) >= now
  );

  // Paginate the allEvents list
  const paginatedData = allEvents.slice(skip, skip + limit);

  return {
    meta: {
      page,
      limit,
      total: allEvents.length,
    },
    data: {
      paginatedData,
      completed: completedEvents,
      upcoming: upcomingEvents,
      all: allEvents,
    },
  };
};

// get all events from db by creatorId
const getEventsFromDB = async (
  filters: IEventFilterRequest,
  options: IPaginationOptions,
  creatorId?: string
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.EventWhereInput[] = [];

  // Search term filter
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

  // Other filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // Filter by creatorId
  if (creatorId) {
    andConditions.push({
      creatorId: {
        equals: creatorId,
      },
    });
  }

  const whereConditions: Prisma.EventWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Fetch all events
  const allEvents = await prisma.event.findMany({
    where: whereConditions,
    include:{
      creator:true,
      reviews:true,
      invitations:true,
      participations:true
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  // Today's date
  const now = new Date();

  // Segment the events
  const completedEvents = allEvents.filter(
    (event) => new Date(event.dateTime) < now
  );
  const upcomingEvents = allEvents.filter(
    (event) => new Date(event.dateTime) >= now
  );

  // Paginate the allEvents list
  const paginatedData = allEvents.slice(skip, skip + limit);

  return {
    meta: {
      page,
      limit,
      total: allEvents.length,
    },
    data: {
      paginatedData,
      completed: completedEvents,
      upcoming: upcomingEvents,
      all: allEvents,
    },
  };
};

// get event by id from db
const getEventByIdFromDB = async (id: string): Promise<Event | null> => {
  const result = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      creator: true,
      participations: true,
      invitations: true,
    },
  });
  return result;
};

// update event into db
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

// delete event from db
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

// join public free event

// const joinPublicEvent = async (eventId: string, userId: string) => {
//   const event = await prisma.event.findUnique({
//     where: {
//       id: eventId,
//     },
//   });

//   if (!event) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//   }

//   if (!event.isPublic || event.isPaid) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       'This is not a public free event'
//     );
//   }

//   const alreadJoined = await prisma.participation.findFirst({
//     where: {
//       eventId,
//       userId,
//     },
//   });

//   if (alreadJoined) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Already joined');
//   }

//   const createParticipation = await prisma.participation.create({
//     data: {
//       userId,
//       eventId,
//       status: 'APPROVED',
//     },
//   });

//   return createParticipation;
// };

// join public paid event
// const joinPublicPaidEvent = async (eventId: string, userId: string) => {
//   const event = await prisma.event.findUnique({
//     where: {
//       id: eventId,
//     },
//   });

//   if (!event) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//   }

//   if (!event.isPaid || !event.isPublic) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'This is not a paid event');
//   }

//   const alreadJoined = await prisma.participation.findFirst({
//     where: {
//       eventId,
//       userId,
//     },
//   });

//   if (alreadJoined) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Already joined');
//   }

//   const createParticipation = await prisma.participation.create({
//     data: {
//       userId,
//       eventId,
//       status: 'PENDING',
//     },
//   });

//   return createParticipation;
// };

//

// join public event
const joinToPublicEvent = async (eventId: string, userId: string) => {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');

  if (!event.isPublic)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not a public event');

  const alreadyJoined = await prisma.participation.findFirst({
    where: { eventId, userId },
  });
  if (alreadyJoined)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already joined');

  const status = event.isPaid ? 'PENDING' : 'APPROVED';

  const participation = await prisma.participation.create({
    data: { userId, eventId, status },
  });

  return participation;
};

// handle paid event
const requestToPaidEvent = async (eventId: string, userId: string) => {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');

  if (event.isPublic)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not a private event');

  const alreadyRequested = await prisma.participation.findFirst({
    where: { eventId, userId },
  });
  if (alreadyRequested)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already requested');

  // Private events are always pending
  const participation = await prisma.participation.create({
    data: { userId, eventId, status: 'PENDING' },
  });

  return participation;
};

// update Participant Status
const updateParticipantStatus = async (
  id: string,
  data: Partial<Participation>
) => {
  await prisma.participation.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.participation.update({
    where: { id },
    data,
  });
  return result;
};

export const EventService = {
  createEventIntoDB,
  getEventsFromDB,
  getAllEventsFromDB,
  getEventByIdFromDB,
  updateEventIntoDB,
  deleteEventFromDB,
  joinToPublicEvent,
  requestToPaidEvent,
  updateParticipantStatus,
};
