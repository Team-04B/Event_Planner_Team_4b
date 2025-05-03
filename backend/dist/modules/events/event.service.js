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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const prisma_1 = __importDefault(require("../../app/shared/prisma"));
const paginationHelper_1 = require("../../app/helper/paginationHelper");
const event_constant_1 = require("./event.constant");
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createEventIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.event.create({
        data: payload,
    });
    return result;
});
const getEventsFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: event_constant_1.eventSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                return {
                    [key]: {
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.event.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.event.count({
        where: whereConditions,
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
const getEventByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.event.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateEventIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.event.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.event.update({
        where: { id },
        data,
    });
    return result;
});
const deleteEventFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const isEventExists = yield transactionClient.event.findUnique({
            where: { id },
        });
        if (!isEventExists) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
        }
        yield transactionClient.participation.deleteMany({
            where: {
                eventId: id,
            },
        });
        yield transactionClient.invitation.deleteMany({
            where: {
                eventId: id,
            },
        });
        yield transactionClient.review.deleteMany({
            where: {
                eventId: id,
            },
        });
        yield transactionClient.payment.deleteMany({
            where: {
                eventId: id,
            },
        });
        // Finally delete the event
        const deleteEvent = yield transactionClient.event.delete({
            where: {
                id,
            },
        });
        return deleteEvent;
    }));
});
const joinPublicEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield prisma_1.default.event.findUnique({
        where: {
            id: eventId,
        },
    });
    if (!event) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
    }
    if (!event.isPublic || event.isPaid) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This is not a public free event');
    }
    const alreadJoined = yield prisma_1.default.participation.findFirst({
        where: {
            eventId,
            userId,
        },
    });
    if (alreadJoined) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already joined');
    }
    const createParticipation = yield prisma_1.default.participation.create({
        data: {
            userId,
            eventId,
            status: 'APPROVED',
        },
    });
    return createParticipation;
});
const joinPaidEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield prisma_1.default.event.findUnique({
        where: {
            id: eventId,
        },
    });
    if (!event) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
    }
    if (!event.isPaid || !event.isPublic) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This is not a paid event');
    }
    const alreadJoined = yield prisma_1.default.participation.findFirst({
        where: {
            eventId,
            userId,
        },
    });
    if (alreadJoined) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already joined');
    }
    const createParticipation = yield prisma_1.default.participation.create({
        data: {
            userId,
            eventId,
            status: 'PENDING',
        },
    });
    return createParticipation;
});
const approveParticipant = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.participation.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.participation.update({
        where: { id },
        data,
    });
    return result;
});
exports.EventService = {
    createEventIntoDB,
    getEventsFromDB,
    getEventByIdFromDB,
    updateEventIntoDB,
    deleteEventFromDB,
    joinPublicEvent,
    joinPaidEvent,
    approveParticipant,
};
