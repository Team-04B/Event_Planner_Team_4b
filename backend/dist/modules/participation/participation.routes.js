"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const participation_controller_1 = require("./participation.controller");
const auth_1 = __importDefault(require("../../app/middleWares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
//respond invitation
router.post('/:invitationId/respond', (0, auth_1.default)(client_1.Role.USER), participation_controller_1.ParticipationController.updateParticipantStatus);
router.get('/', (0, auth_1.default)(client_1.Role.USER), participation_controller_1.ParticipationController.getPendingParticipations);
exports.ParticipationRoutes = router;
