"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payments_controller_1 = require("./payments.controller");
const auth_1 = __importDefault(require("../../app/middleWares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/initpayment', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.USER), payments_controller_1.PaymentController.initPayment);
router.post('/ipn', payments_controller_1.PaymentController.validationPayment);
router.post('/success/:tran_id', payments_controller_1.PaymentController.paymentSuccess);
router.get('/dashboard', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.USER), payments_controller_1.PaymentController.getDashboardOverview);
exports.PaymentRoutes = router;
