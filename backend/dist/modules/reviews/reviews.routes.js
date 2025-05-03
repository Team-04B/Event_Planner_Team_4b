"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../app/middleWares/validationRequest");
const reviews_controller_1 = require("./reviews.controller");
const reviews_validation_1 = require("./reviews.validation");
const router = express_1.default.Router();
router.patch('/:id', (0, validationRequest_1.validateRequest)(reviews_validation_1.ReviewValidations.updateReviewZodSchema), reviews_controller_1.ReviewController.updateReview);
router.delete('/:id', reviews_controller_1.ReviewController.deleteReview);
exports.ReviewsRoutes = router;
