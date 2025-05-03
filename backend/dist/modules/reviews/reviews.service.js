"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const prisma_1 = __importDefault(require("../../app/shared/prisma"));
// create reviews for each event 
const createReviewIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.event.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.review.create({
        data: {
            userId: data === null || data === void 0 ? void 0 : data.userId,
            rating: data.rating,
            comment: data === null || data === void 0 ? void 0 : data.comment,
            eventId: id
        }
    });
    return result;
});
//  update reviews 
const updateReviewIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.review.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.review.update({
        where: {
            id
        },
        data
    });
    return result;
});
//  Delete reviews 
const deleteReviewIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.review.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.review.delete({
        where: {
            id
        },
    });
    return result;
});
//  get all reviews for each event 
const getAllReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.review.findMany({
        where: {
            eventId: id
        }
    });
    return result;
});
exports.ReviewServices = {
    createReviewIntoDB,
    getAllReviewFromDB,
    updateReviewIntoDB,
    deleteReviewIntoDB
};
