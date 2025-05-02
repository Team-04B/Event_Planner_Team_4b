import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    rating: z.number({
      required_error: 'Rating is required',
    }).min(1, 'Rating must be at least 1').max(5, 'Rating cannot be more than 5'),
    comment: z.string({
      required_error: 'Comment is required',
    }),
  }),
});

const updateReviewZodSchema = z.object({
 body:z.object({
  userId: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().optional(),
 })
});

export const ReviewValidations = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
