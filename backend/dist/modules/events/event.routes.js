"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("./event.controller");
const validationRequest_1 = require("../../app/middleWares/validationRequest");
const event_validation_1 = require("./event.validation");
const reviews_controller_1 = require("../reviews/reviews.controller");
const reviews_validation_1 = require("../reviews/reviews.validation");
const auth_1 = __importDefault(require("../../app/middleWares/auth"));
const client_1 = require("@prisma/client");
const invitations_controller_1 = require("../invitations/invitations.controller");
const router = express_1.default.Router();
router.post('/', 
// auth(Role.USER),
(0, validationRequest_1.validateRequest)(event_validation_1.EventValidations.createEventZodSchema), event_controller_1.EventController.createEvent);
router.get('/', event_controller_1.EventController.getEvents);
router.get('/:id', event_controller_1.EventController.getEventById);
router.patch('/:id', (0, validationRequest_1.validateRequest)(event_validation_1.EventValidations.updateEventZodSchema), event_controller_1.EventController.updateEvent);
// reviews routes 
router.post('/:id/reviews', (0, validationRequest_1.validateRequest)(reviews_validation_1.ReviewValidations.createReviewZodSchema), reviews_controller_1.ReviewController.createReview);
router.get('/:id/reviews', reviews_controller_1.ReviewController.getAllReviews);
// invitaion routes 
router.post('/:id/invite', (0, auth_1.default)(client_1.Role.USER), invitations_controller_1.InvitationController.createInvitaion);
router.delete('/:id', event_controller_1.EventController.deleteFromDB);
// approve participant
router.patch('/:id/participants/:participantId/approve', event_controller_1.EventController.approveParticipant);
// // reject participant
// router.patch('/:id/participants/:participantId/reject');
// // ban participant
// router.patch('/:id/participants/:participantId/ban');
//join free public event
router.post('/:id/join', event_controller_1.EventController.joinPublicEvent);
// Request to join private/paid event
router.post('/:id/request', event_controller_1.EventController.joinPaidEvent);
exports.EventRoutes = router;
