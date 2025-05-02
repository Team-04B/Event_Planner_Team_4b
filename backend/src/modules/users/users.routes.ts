import express from 'express';
import { UserContolors } from './users.controller';
import auth from '../../app/middleWares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.get('/', auth(Role.ADMIN), UserContolors.getAllUsers);
router.get('/:id', auth(Role.ADMIN, Role.USER), UserContolors.getSingleUsers);
router.put(
  '/:id',
  auth(Role.ADMIN, Role.USER),
  UserContolors.updateSingleUsers
);
router.delete('/:id', auth(Role.ADMIN), UserContolors.deletedSingleUsers);
export const UsersRoutes = router;
