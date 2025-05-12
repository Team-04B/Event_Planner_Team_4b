import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
// Create schema for event form (for creating a new event)
export const eventFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.date({ required_error: "Event date is required" }),
  venue: z.string().min(3, { message: "Venue must be at least 3 characters" }),
  publicEvent: z.boolean(),
  paidEvent: z.boolean(),
  fee: z.string().optional().nullable(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `File size should be less than 5MB`)
    .nullable(),
})

// Export the inferred type
export type EventFormType = z.infer<typeof eventFormSchema>;

// Update schema for event form (for updating existing events)
// export const updateEventFormSchema = z.object({
//   title: z.string().optional(),
//   description: z.string().optional(),
//   date: z
//     .preprocess((val): Date | null => {
//       if (!val) return null;
//       const parsed = new Date(val as string);
//       return isNaN(parsed.getTime()) ? null : parsed;
//     }, z.date().nullable())
//     .optional(),
//   venue: z.string().optional(),
//   publicEvent: z.boolean().optional(),
//   paidEvent: z.boolean().optional(),
//   image: z
//     .any()
//     .refine((file) => file instanceof File || file === null, {
//       message: "Invalid image file",
//     })
//     .nullable()
//     .optional(),
//   fee: z
//     .string()
//     .nullable()
//     .optional()
//     .transform((val) => {
//       if (val === null || val === undefined || val === "") return null;
//       const parsed = parseFloat(val);
//       return isNaN(parsed) ? null : parsed;
//     })
//     .refine((val) => val === null || typeof val === "number", {
//       message: "Fee must be a valid number",
//     }),
//   eventImgUrl: z
//     .string()
//     .url()
//     .optional() // Handle the image URL in the backend model
//     .nullable(),
// });
