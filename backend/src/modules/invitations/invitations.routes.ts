import express from "express"
import { ReviewController } from "../reviews/reviews.controller"

const router = express.Router()

router.patch('/:id',
    ReviewController.updateReview)
    
export const InvitationRoutes = router