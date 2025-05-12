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
exports.userServices = void 0;
const prisma_1 = __importDefault(require("../../app/shared/prisma"));
const getAllUsersInToDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query === null || query === void 0 ? void 0 : query.page) || 1;
    const limit = Number(query === null || query === void 0 ? void 0 : query.limit) || 10;
    const skip = (page - 1) * limit;
    let where = undefined;
    if ((query === null || query === void 0 ? void 0 : query.searchTerm) &&
        typeof (query === null || query === void 0 ? void 0 : query.searchTerm) === 'string' &&
        (query === null || query === void 0 ? void 0 : query.searchTerm.trim()) !== '') {
        where = {
            OR: [
                { name: { contains: query === null || query === void 0 ? void 0 : query.searchTerm, mode: 'insensitive' } },
                { email: { equals: query === null || query === void 0 ? void 0 : query.searchTerm, mode: 'insensitive' } },
            ],
        };
    }
    const result = yield prisma_1.default.user.findMany({
        where,
        skip,
        take: limit,
        select: {
            name: true,
            email: true,
            id: true,
            role: true,
            updatedAt: true,
        },
    });
    return {
        meta: {
            page,
            limit,
            total: yield prisma_1.default.user.count({ where }),
        },
        data: result,
    };
});
const getSingleUsersInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: id,
        },
        select: {
            name: true,
            email: true,
            id: true,
            createdAt: true,
            role: true,
            updatedAt: true,
        },
    });
    return result;
});
const updateUserInToDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: { id: id },
        data: payload,
        select: {
            name: true,
            email: true,
            // events: true,
            id: true,
            invitations: true,
            participations: true,
            payments: true,
            createdAt: true,
            reviews: true,
            role: true,
            updatedAt: true,
        },
    });
    return result;
});
const deleteUserInToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({ where: { id: id } });
    return result;
});
exports.userServices = {
    getAllUsersInToDb,
    getSingleUsersInToDb,
    updateUserInToDb,
    deleteUserInToDb,
};
