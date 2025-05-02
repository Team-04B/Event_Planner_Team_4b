import express from "express"
import { ReviewController } from "../reviews/reviews.controller"
import { InvitationController } from "./invitations.controller"

const router = express.Router()

router.get('/',
    InvitationController.getAllInvitaion)
    
export const InvitationRoutes = router