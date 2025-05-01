import express from "express"
import { AuthController } from "./auth.controller"
import { validateRequest } from "../../app/middleWares/validationRequest"
import { AuthValidation } from "./auth.validation"

const router = express.Router()

router.post('/register',
    validateRequest(AuthValidation.registerUserSchema),
    AuthController.registerUser)


export const AuthRoutes = router