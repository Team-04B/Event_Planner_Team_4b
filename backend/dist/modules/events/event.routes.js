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
const invitations_controller_1 = require("../invitations/invitations.controller");
const auth_1 = __importDefault(require("../../app/middleWares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
//create event
router.post('/', (0, auth_1.default)(client_1.Role.USER), (0, validationRequest_1.validateRequest)(event_validation_1.EventValidations.createEventZodSchema), event_controller_1.EventController.createEvent);
//get all events
router.get('/', event_controller_1.EventController.getEvents);
// get event by id
router.get('/:id', event_controller_1.EventController.getEventById);
// update event
router.patch('/:id', (0, auth_1.default)(client_1.Role.USER), (0, validationRequest_1.validateRequest)(event_validation_1.EventValidations.updateEventZodSchema), event_controller_1.EventController.updateEvent);
// delete event from db
router.delete('/:id', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.deleteFromDB);
// updateParticipantStatus (PENDING,APPROVED,REJECTED,BANNED)
router.patch('/:id/participants/:participantId/status', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.updateParticipantStatus);
// event.route.ts
router.post('/:id/join', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.handleJoinEvent); // Public events
router.post('/:id/request', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.handleRequestEvent); // Private events
// //join free public event
// router.post('/:id/join', EventController.joinPublicEvent);
// // Request to join private/paid event
// router.post('/:id/request', auth(Role.USER), EventController.joinPaidEvent);
// reviews routes
router.post('/:id/reviews', (0, validationRequest_1.validateRequest)(reviews_validation_1.ReviewValidations.createReviewZodSchema), reviews_controller_1.ReviewController.createReview);
router.get('/:id/reviews', reviews_controller_1.ReviewController.getAllReviews);
// invitaion routes
router.post('/:id/invite', (0, auth_1.default)(client_1.Role.USER), invitations_controller_1.InvitationController.createInvitaion);
exports.EventRoutes = router;
