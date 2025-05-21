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
exports.ParticipationService = void 0;
const prisma_1 = __importDefault(require("../../app/shared/prisma"));
const paginationHelper_1 = require("../../app/helper/paginationHelper");
// respond invitation
const respondToInvitation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.invitation.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.invitation.update({
        where: { id },
        data,
    });
    return result;
});
const getPendingParticipations = (filters, options, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, paid } = filters;
    // const user = await prisma.user.findUnique({
    //   where:{
    //     id:userId
    //   },
    //   include:{
    //     events:true
    //   }
    // })
    const andConditions = [
        {
            status: 'PENDING',
        },
        {
            event: {
                creatorId: userId
            }
        }
    ];
    // andConditions.push({
    //   user:{
    //     id:userId
    //   }
    // })
    // Search term filter (user.name, user.email, event.title)
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    user: {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    user: {
                        email: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    event: {
                        title: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                },
            ],
        });
    }
    // Paid filter
    if (paid === 'true' || paid === 'false') {
        andConditions.push({
            paid: paid === 'true',
        });
    }
    const whereCondition = {
        AND: andConditions,
    };
    const participations = yield prisma_1.default.participation.findMany({
        where: whereCondition,
        include: {
            user: true,
            event: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.participation.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: participations,
    };
});
exports.ParticipationService = {
    respondToInvitation,
    getPendingParticipations
};
