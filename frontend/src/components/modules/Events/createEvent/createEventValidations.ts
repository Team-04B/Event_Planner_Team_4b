import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  venue: z.string().min(1, "Venue is required"),
  publicEvent: z.boolean(),
  paidEvent: z.boolean(),
  image: z
    .any()
    .refine((file) => file instanceof File, { message: "Image is required" }),
  fee: z
    .union([z.string(), z.number(), z.null()])
    .optional()
    .transform((val) => (val === "" ? null : val)),
});

export type EventFormType = z.infer<typeof eventFormSchema>;

export const updateEventFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.date().nullable().optional(),
  venue: z.string().optional(),
  publicEvent: z.boolean().optional(),
  paidEvent: z.boolean().optional(),
  image: z.instanceof(File).nullable().optional(),
  fee: z
    .string()
    .nullable()
    .optional()
    .transform((val) =>
      val === null || val === undefined || val === "" ? null : parseFloat(val)
    )
    .refine((val) => val === null || !isNaN(val), {
      message: "Fee must be a valid number",
    }),
});
