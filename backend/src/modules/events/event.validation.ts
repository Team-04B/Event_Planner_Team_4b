import { z } from 'zod';

const EventCategoryEnum = z.enum([
  'Professional',
  'Educational',
  'Social',
  'Business',
  'Health',
  'Sports',
  'Tech',
  'Sales',
  'Community',
  'Personal',
]);

const createEventZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    dateTime: z.string({
      required_error: 'Date & Time is required',
    }),
    venue: z.string({
      required_error: 'Venue is required',
    }),
    category: EventCategoryEnum,
    isPublic: z.boolean({
      required_error: 'isPublic is required',
    }),
    isPaid: z.boolean({
      required_error: 'isPaid is required',
    }),
    fee: z.number().nullable().optional(),
  }),
});

const updateEventZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dateTime: z.string().optional(),
  venue: z.string().optional(),
  category: EventCategoryEnum.optional(),
  isPublic: z.boolean().optional(),
  isPaid: z.boolean().optional(),
  fee: z.number().nullable().optional(),
  creatorId: z.string().optional(),
});

export const EventValidations = {
  createEventZodSchema,
  updateEventZodSchema,
};
