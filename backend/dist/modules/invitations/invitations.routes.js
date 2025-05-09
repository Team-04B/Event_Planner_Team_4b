"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const invitations_controller_1 = require("./invitations.controller");
const auth_1 = __importDefault(require("../../app/middleWares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.USER), invitations_controller_1.InvitationController.getMyAllnvitaions);
router.get('/sent-invitaions', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.USER), invitations_controller_1.InvitationController.getMySentInvitaions);
exports.InvitationRoutes = router;
