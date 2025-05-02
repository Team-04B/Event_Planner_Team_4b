import express from "express"

import { validateRequest } from "../../app/middleWares/validationRequest"
import { ReviewController } from "./reviews.controller"
import { ReviewValidations } from "./reviews.validation"


const router = express.Router()

router.patch('/:id',validateRequest(ReviewValidations.updateReviewZodSchema),
    ReviewController.updateReview)
router.delete('/:id',
    ReviewController.deleteReview)


export const ReviewsRoutes = router