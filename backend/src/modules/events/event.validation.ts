import { z } from 'zod';

const createEventZodSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.date().nullable(), // Accepts a nullable Date
  venue: z.string().min(1, 'Venue is required'),
  image: z.instanceof(File).nullable(), // Ensures image is of type File or null
  fee: z.number().nullable().optional(), // Directly accepts fee as a number, nullable and optional
  isPublic: z.boolean(),
  isPaid: z.boolean(),
});

const updateEventZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dateTime: z.string().optional(),
  venue: z.string().optional(),
  isPublic: z.boolean().optional(),
  isPaid: z.boolean().optional(),
  fee: z.number().nullable().optional(),
  creatorId: z.string().optional(),
});

export const EventValidations = {
  createEventZodSchema,
  updateEventZodSchema,
};
