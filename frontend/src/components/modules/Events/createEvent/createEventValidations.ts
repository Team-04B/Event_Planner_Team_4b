import { z } from "zod";
import { EventFormData } from "@/types/eventType";

// Create schema for event form (for creating a new event)
export const eventFormSchema: z.ZodType<EventFormData> = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.preprocess((val): Date | undefined => {
    if (typeof val === "string" || val instanceof Date) {
      const parsed = new Date(val);
      return isNaN(parsed.getTime()) ? undefined : parsed;
    }
    return undefined;
  }, z.date({ required_error: "Date is required" }).optional()),
  venue: z.string().min(1, "Venue is required"),
  publicEvent: z.boolean(),
  paidEvent: z.boolean(),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Image is required",
    })
    .nullable()
    .optional(),
  fee: z
    .union([z.string(), z.number(), z.null()])
    .optional()
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return null;
      const parsed = typeof val === "string" ? parseFloat(val) : val;
      return isNaN(parsed) ? null : parsed;
    }),
});

// Export the inferred type
export type EventFormType = z.infer<typeof eventFormSchema>;

// Update schema for event form (for updating existing events)
export const updateEventFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z
    .preprocess((val): Date | null => {
      if (!val) return null;
      const parsed = new Date(val as string);
      return isNaN(parsed.getTime()) ? null : parsed;
    }, z.date().nullable())
    .optional(),
  venue: z.string().optional(),
  publicEvent: z.boolean().optional(),
  paidEvent: z.boolean().optional(),
  image: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Invalid image file",
    })
    .nullable()
    .optional(),
  fee: z
    .string()
    .nullable()
    .optional()
    .transform((val) => {
      if (val === null || val === undefined || val === "") return null;
      const parsed = parseFloat(val);
      return isNaN(parsed) ? null : parsed;
    })
    .refine((val) => val === null || typeof val === "number", {
      message: "Fee must be a valid number",
    }),
  eventImgUrl: z
    .string()
    .url()
    .optional() // Handle the image URL in the backend model
    .nullable(),
});
