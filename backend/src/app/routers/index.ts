import express from 'express';
import { AuthRoutes } from '../../modules/auth/auth.routes';
import { UsersRoutes } from '../../modules/users/users.routes';
import { EventRoutes } from '../../modules/events/event.routes';
import { ParticipationRoutes } from '../../modules/participation/participation.routes';
import { InvitationRoutes } from '../../modules/invitations/invitations.routes';
import { PaymentRoutes } from '../../modules/payments/payments.routes';
import { ReviewsRoutes } from '../../modules/reviews/reviews.routes';
import { AdminRoutes } from '../../modules/admin/admin.routes';
import { MailRoutes } from '../../modules/contact/contact.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/events',
    route: EventRoutes,
  },
  {
    path: '/participants',
    route: ParticipationRoutes,
  },
  {
    path: '/invitations',
    route: InvitationRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/reviews',
    route: ReviewsRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/sendMail',
    route: MailRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
