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
exports.InvitaionServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../app/shared/prisma"));
const paginationHelper_1 = require("../../app/helper/paginationHelper");
// create Invitaion
const createInvitaionDB = (id, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, { data });
    yield prisma_1.default.event.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.invitation.create({
        data: {
            invitedById: userId,
            eventId: id,
            userEmail: data.userEmail,
            paid: data === null || data === void 0 ? void 0 : data.paid,
            status: data === null || data === void 0 ? void 0 : data.status,
            invitationNote: data === null || data === void 0 ? void 0 : data.invitationNote
        },
    });
    return result;
});
//  const getMyAllnvitaionsFromDB =async (id:string)=>{
//      const result = await prisma.invitation.findMany({
//      where:{
//      userId:id
//      }
//      })
//      return result;
//  }
const getMyAllnvitaionsFromDB = (options, email) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const result = yield prisma_1.default.invitation.findMany({
        where: {
            userEmail: email,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
        include: {
            event: true,
            invitedUser: true
        },
    });
    const total = yield prisma_1.default.invitation.count({
        where: {
            userEmail: email,
        },
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getMyInvitedOnvitationsFromDB = (options, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const result = yield prisma_1.default.invitation.findMany({
        where: {
            invitedById: id,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
        include: {
            event: true,
            invitedUser: true
        },
    });
    const total = yield prisma_1.default.invitation.count({
        where: {
            invitedById: id,
        },
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleInvitaionIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.invitation.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            invitedBy: true,
            event: true,
        }
    });
    return result;
});
const acceptInvitaionInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the invitation exists
    yield prisma_1.default.invitation.findUniqueOrThrow({
        where: { id },
    });
    const result = yield prisma_1.default.invitation.update({
        where: { id },
        data: {
            status: client_1.InvitationStatus.ACCEPTED,
        },
    });
    return result;
});
const declineInvitaionInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the invitation exists
    yield prisma_1.default.invitation.findUniqueOrThrow({
        where: { id },
    });
    const result = yield prisma_1.default.invitation.update({
        where: { id },
        data: {
            status: client_1.InvitationStatus.DECLINED,
        },
    });
    return result;
});
exports.InvitaionServices = {
    createInvitaionDB,
    getMyAllnvitaionsFromDB,
    getMyInvitedOnvitationsFromDB,
    getSingleInvitaionIntoDB,
    acceptInvitaionInDB,
    declineInvitaionInDB
};
