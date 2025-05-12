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
const multer_config_1 = require("../../app/config/multer-config");
const router = express_1.default.Router();
//create event
router.post('/', (0, auth_1.default)(client_1.Role.USER), multer_config_1.multerUpload.single('file'), 
// fileUploder.upload.single('file'),
(req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validationRequest_1.validateRequest)(event_validation_1.EventValidations.createEventZodSchema), event_controller_1.EventController.createEvent);
// get all events
router.get('/', event_controller_1.EventController.getAllEvents);
//get all events by user
router.get('/', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), event_controller_1.EventController.getAllEventsByUserId);
// get event by id
router.get('/:id', 
// auth(Role.USER,Role.ADMIN),
event_controller_1.EventController.getEventById);
// update event
router.patch('/:id', (0, auth_1.default)(client_1.Role.USER), 
// fileUploder.upload.single('file'),
multer_config_1.multerUpload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validationRequest_1.validateRequest)(event_validation_1.EventValidations.updateEventZodSchema), event_controller_1.EventController.updateEvent);
// delete event from db
router.delete('/:id', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.deleteFromDB);
// admin delete event
router.delete('/deleteEvent', (0, auth_1.default)(client_1.Role.ADMIN));
// updateParticipantStatus (PENDING,APPROVED,REJECTED,BANNED)
router.patch('/:id/participants/:participantId/status', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.updateParticipantStatus);
// Public events
router.post('/:id/join', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.handleJoinEvent);
// Private events
router.post('/:id/request', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.handleRequestEvent);
// get participation status
router.get('/:id/participation-status', (0, auth_1.default)(client_1.Role.USER), event_controller_1.EventController.getParticipationStatus);
// reviews routes
router.post('/:id/reviews', (0, validationRequest_1.validateRequest)(reviews_validation_1.ReviewValidations.createReviewZodSchema), reviews_controller_1.ReviewController.createReview);
router.get('/:id/reviews', reviews_controller_1.ReviewController.getAllReviews);
// invitaion routes
router.post('/:id/invite', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.USER), invitations_controller_1.InvitationController.createInvitaion);
router.get('/all-events', 
// auth(Role.ADMIN, Role.USER),
event_controller_1.EventController.getAllEvents);
exports.EventRoutes = router;
