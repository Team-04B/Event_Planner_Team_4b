import express from "express"
import { PaymentController } from "./payments.controller";
import auth from "../../app/middleWares/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post('/initpayment',auth(Role.ADMIN,Role.USER),PaymentController.initPayment)


router.get('/ipn',PaymentController.validationPayment)

router.post('/success/:tran_id',PaymentController.paymentSuccess)

export const PaymentRoutes = router