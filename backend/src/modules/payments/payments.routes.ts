import express from 'express';
import { PaymentController } from './payments.controller';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/initpayment',
  auth(Role.ADMIN, Role.USER),
  PaymentController.initPayment
);

router.post('/ipn', PaymentController.validationPayment);

router.post('/success/:tran_id', PaymentController.paymentSuccess);

router.get('/', PaymentController.getDashboardOverview);

export const PaymentRoutes = router;
