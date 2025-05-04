"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        rating: zod_1.z.number({
            required_error: 'Rating is required',
        }).min(1, 'Rating must be at least 1').max(5, 'Rating cannot be more than 5'),
        comment: zod_1.z.string({
            required_error: 'Comment is required',
        }),
    }),
});
const updateReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        rating: zod_1.z.number().min(1).max(5).optional(),
        comment: zod_1.z.string().optional(),
    })
});
exports.ReviewValidations = {
    createReviewZodSchema,
    updateReviewZodSchema,
};
