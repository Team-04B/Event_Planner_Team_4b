"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidations = void 0;
const zod_1 = require("zod");
const EventCategoryEnum = zod_1.z.enum([
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
const createEventZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        dateTime: zod_1.z.string({
            required_error: 'Date & Time is required',
        }),
        venue: zod_1.z.string({
            required_error: 'Venue is required',
        }),
        category: EventCategoryEnum,
        isPublic: zod_1.z.boolean({
            required_error: 'isPublic is required',
        }),
        isPaid: zod_1.z.boolean({
            required_error: 'isPaid is required',
        }),
        fee: zod_1.z.number().nullable().optional(),
    }),
});
const updateEventZodSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    dateTime: zod_1.z.string().optional(),
    venue: zod_1.z.string().optional(),
    category: EventCategoryEnum.optional(),
    isPublic: zod_1.z.boolean().optional(),
    isPaid: zod_1.z.boolean().optional(),
    fee: zod_1.z.number().nullable().optional(),
    creatorId: zod_1.z.string().optional(),
});
exports.EventValidations = {
    createEventZodSchema,
    updateEventZodSchema,
};
