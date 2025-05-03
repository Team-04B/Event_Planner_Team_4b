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
const prisma_1 = __importDefault(require("../../app/shared/prisma"));
const paginationHelper_1 = require("../../app/helper/paginationHelper");
// create Invitaion
const createInvitaionDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, data.userId);
    yield prisma_1.default.event.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.invitation.create({
        data: {
            userId: data === null || data === void 0 ? void 0 : data.userId,
            eventId: id,
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
const getMyAllnvitaionsFromDB = (options, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const result = yield prisma_1.default.invitation.findMany({
        where: {
            userId: id,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.invitation.count({
        where: {
            userId: id,
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
exports.InvitaionServices = {
    createInvitaionDB,
    getMyAllnvitaionsFromDB,
};
