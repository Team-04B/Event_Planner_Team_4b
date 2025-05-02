import express from "express"

import { validateRequest } from "../../app/middleWares/validationRequest"
import { AuthValidation } from "../auth/auth.validation"
import { AuthController } from "../auth/auth.controller"
import { ReviewController } from "./reviews.controller"


const router = express.Router()




export const ReviewsRoutes = router