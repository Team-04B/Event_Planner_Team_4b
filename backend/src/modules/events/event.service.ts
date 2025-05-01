import { Event } from '@prisma/client';
import prisma from '../../app/shared/prisma';

const createEventIntoDB = async (payload: Event) => {
  // const result = await prisma.event.create({
  //   data: payload,
  // });
};

export const EventService = {
  createEventIntoDB,
};
