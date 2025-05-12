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
// create event into db
const createEventIntoDB = (payload, creatorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.event.create({
        data: Object.assign(Object.assign({}, payload), { creatorId }),
    });
    return result;
});
// getAll events from db
const getAllEventsFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // Search term filter
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
    // Other filters
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // Fetch all events
    const allEvents = yield prisma_1.default.event.findMany({
        where: whereConditions,
        include: {
            creator: true,
            reviews: true,
            invitations: true,
            participations: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    // Today's date
    const now = new Date();
    // Segment the events
    const completedEvents = allEvents.filter((event) => new Date(event.dateTime) < now);
    const upcomingEvents = allEvents.filter((event) => new Date(event.dateTime) >= now);
    // Paginate the allEvents list
    const paginatedData = allEvents.slice(skip, skip + limit);
    return {
        meta: {
            page,
            limit,
            total: allEvents.length,
        },
        data: {
            paginatedData,
            completed: completedEvents,
            upcoming: upcomingEvents,
            all: allEvents,
        },
    };
});
// get all events from db by creatorId
const getEventsFromDB = (filters, options, creatorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // Search term filter
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
    // Other filters
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    // Filter by creatorId
    if (creatorId) {
        andConditions.push({
            creatorId: {
                equals: creatorId,
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // Fetch all events
    const allEvents = yield prisma_1.default.event.findMany({
        where: whereConditions,
        include: {
            creator: true,
            reviews: true,
            invitations: true,
            participations: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    // Today's date
    const now = new Date();
    // Segment the events
    const completedEvents = allEvents.filter((event) => new Date(event.dateTime) < now);
    const upcomingEvents = allEvents.filter((event) => new Date(event.dateTime) >= now);
    // Paginate the allEvents list
    const paginatedData = allEvents.slice(skip, skip + limit);
    return {
        meta: {
            page,
            limit,
            total: allEvents.length,
        },
        data: {
            paginatedData,
            completed: completedEvents,
            upcoming: upcomingEvents,
            all: allEvents,
        },
    };
});
// get event by id from db
const getEventByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.event.findUnique({
        where: {
            id,
        },
        include: {
            creator: true,
            participations: true,
            invitations: true,
        },
    });
    return result;
});
// update event into db
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
// delete event from db
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
// join public free event
// const joinPublicEvent = async (eventId: string, userId: string) => {
//   const event = await prisma.event.findUnique({
//     where: {
//       id: eventId,
//     },
//   });
//   if (!event) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//   }
//   if (!event.isPublic || event.isPaid) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       'This is not a public free event'
//     );
//   }
//   const alreadJoined = await prisma.participation.findFirst({
//     where: {
//       eventId,
//       userId,
//     },
//   });
//   if (alreadJoined) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Already joined');
//   }
//   const createParticipation = await prisma.participation.create({
//     data: {
//       userId,
//       eventId,
//       status: 'APPROVED',
//     },
//   });
//   return createParticipation;
// };
// join public paid event
// const joinPublicPaidEvent = async (eventId: string, userId: string) => {
//   const event = await prisma.event.findUnique({
//     where: {
//       id: eventId,
//     },
//   });
//   if (!event) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
//   }
//   if (!event.isPaid || !event.isPublic) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'This is not a paid event');
//   }
//   const alreadJoined = await prisma.participation.findFirst({
//     where: {
//       eventId,
//       userId,
//     },
//   });
//   if (alreadJoined) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Already joined');
//   }
//   const createParticipation = await prisma.participation.create({
//     data: {
//       userId,
//       eventId,
//       status: 'PENDING',
//     },
//   });
//   return createParticipation;
// };
//
// join public event
const joinToPublicEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield prisma_1.default.event.findUnique({ where: { id: eventId } });
    if (!event)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
    if (!event.isPublic)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not a public event');
    const alreadyJoined = yield prisma_1.default.participation.findFirst({
        where: { eventId, userId },
    });
    if (alreadyJoined)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already joined');
    const status = event.isPaid ? 'PENDING' : 'APPROVED';
    const participation = yield prisma_1.default.participation.create({
        data: { userId, eventId, status },
    });
    return participation;
});
// handle paid event
const requestToPaidEvent = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield prisma_1.default.event.findUnique({ where: { id: eventId } });
    if (!event)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Event not found');
    if (event.isPublic)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not a private event');
    const alreadyRequested = yield prisma_1.default.participation.findFirst({
        where: { eventId, userId },
    });
    if (alreadyRequested)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already requested');
    // Private events are always pending
    const participation = yield prisma_1.default.participation.create({
        data: { userId, eventId, status: 'PENDING' },
    });
    return participation;
});
const getParticipationStatus = (eventId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.participation.findFirst({
        where: {
            eventId,
            userId,
        },
    });
    return result;
});
// update Participant Status
const updateParticipantStatus = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
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
// const getAllEventsFromDB = async (
//   filters: IEventFilterRequest,
//   options: IPaginationOptions
// ) => {
//   const { limit, page, skip } = paginationHelper.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;
//   const andConditions: Prisma.EventWhereInput[] = [];
//   // Search term filter
//   if (searchTerm) {
//     andConditions.push({
//       OR: eventSearchableFields.map((field) => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }
//   // Other filters
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => ({
//         [key]: {
//           equals: (filterData as any)[key],
//         },
//       })),
//     });
//   }
//   // Filter by creatorId
//   const whereConditions: Prisma.EventWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   // Fetch all events
//   const allEvents = await prisma.event.findMany({
//     where: whereConditions,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//             createdAt: 'desc',
//           },
//   });
//   // Today's date
//   const now = new Date();
//   // Segment the events
//   const completedEvents = allEvents.filter(
//     (event) => new Date(event.dateTime) < now
//   );
//   const upcomingEvents = allEvents.filter(
//     (event) => new Date(event.dateTime) >= now
//   );
//   // Paginate the allEvents list
//   const paginatedData = allEvents.slice(skip, skip + limit);
//   return {
//     meta: {
//       page,
//       limit,
//       total: allEvents.length,
//     },
//     data: {
//       paginatedData,
//       completed: completedEvents,
//       upcoming: upcomingEvents,
//       all: allEvents,
//     },
//   };
const adminDeletedEventFromDB = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.event.delete({
        where: {
            id: eventId,
        },
    });
    return result;
});
exports.EventService = {
    createEventIntoDB,
    getEventsFromDB,
    getAllEventsFromDB,
    getEventByIdFromDB,
    updateEventIntoDB,
    deleteEventFromDB,
    joinToPublicEvent,
    requestToPaidEvent,
    getParticipationStatus,
    updateParticipantStatus,
    adminDeletedEventFromDB,
};
