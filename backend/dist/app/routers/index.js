"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../../modules/auth/auth.routes");
const users_routes_1 = require("../../modules/users/users.routes");
const event_routes_1 = require("../../modules/events/event.routes");
const participation_routes_1 = require("../../modules/participation/participation.routes");
const invitations_routes_1 = require("../../modules/invitations/invitations.routes");
const payments_routes_1 = require("../../modules/payments/payments.routes");
const reviews_routes_1 = require("../../modules/reviews/reviews.routes");
const admin_routes_1 = require("../../modules/admin/admin.routes");
const contact_route_1 = require("../../modules/contact/contact.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        route: users_routes_1.UsersRoutes,
    },
    {
        path: '/events',
        route: event_routes_1.EventRoutes,
    },
    {
        path: '/participants',
        route: participation_routes_1.ParticipationRoutes,
    },
    {
        path: '/invitations',
        route: invitations_routes_1.InvitationRoutes,
    },
    {
        path: '/payments',
        route: payments_routes_1.PaymentRoutes,
    },
    {
        path: '/reviews',
        route: reviews_routes_1.ReviewsRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/sendMail',
        route: contact_route_1.MailRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
