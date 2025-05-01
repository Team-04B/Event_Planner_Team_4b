import express from "express"

import { validateRequest } from "../../app/middleWares/validationRequest"
import { AuthValidation } from "../auth/auth.validation"
import { AuthController } from "../auth/auth.controller"


const router = express.Router()

router.post('/register',
    validateRequest(AuthValidation.registerUserSchema),
    AuthController.registerUser)


export const AuthRoutes = router