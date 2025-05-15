"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validationRequest_1 = require("../../app/middleWares/validationRequest");
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../app/middleWares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/register', (0, validationRequest_1.validateRequest)(auth_validation_1.AuthValidation.registerUserSchema), auth_controller_1.AuthController.registerUser);
router.post('/login', auth_controller_1.AuthController.logingUser);
router.post('/refesh-token', auth_controller_1.AuthController.refeshToken);
router.post('/cheange-password', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), auth_controller_1.AuthController.cheangePassword);
exports.AuthRoutes = router;
