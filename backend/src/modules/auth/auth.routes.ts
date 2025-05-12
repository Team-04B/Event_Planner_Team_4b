import express from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../app/middleWares/validationRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerUserSchema),
  AuthController.registerUser
);
router.post('/login', AuthController.logingUser);
router.post('/refesh-token', AuthController.refeshToken);
router.post(
  '/cheange-password',
  auth(Role.USER, Role.ADMIN),
  AuthController.cheangePassword
);

export const AuthRoutes = router;
