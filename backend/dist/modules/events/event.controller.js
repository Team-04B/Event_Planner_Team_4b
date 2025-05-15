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
exports.EventController = void 0;
const catchAsync_1 = require("../../app/helper/catchAsync");
const sendResponse_1 = require("../../app/shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const event_service_1 = require("./event.service");
const pick_1 = __importDefault(require("../../app/shared/pick"));
const event_constant_1 = require("./event.constant");
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
// create event
const createEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    console.log(file);
    if (!file) {
        throw new Error('Image file is required');
    }
    const creatorId = req.user.id;
    const eventData = Object.assign(Object.assign({}, req.body), { eventImgUrl: file.path });
    const result = yield event_service_1.EventService.createEventIntoDB(eventData, creatorId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Event created successfully',
        data: result,
    });
}));
// // get all events - public
// const getAllEvents = catchAsync(async (req, res) => {
//   const rawFilters = pick(req.query, eventFilterableFields);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   // Handle boolean conversion for 'isPublic' and 'isPaid' and ensure other filters are correctly handled
//   const filters: IEventFilterRequest = {
//     isPublic:
//       rawFilters.isPublic === 'true'
//         ? true
//         : rawFilters.isPublic === 'false'
//           ? false
//           : undefined,
//     isPaid:
//       rawFilters.isPaid === 'true'
//         ? true
//         : rawFilters.isPaid === 'false'
//           ? false
//           : undefined,
//     searchTerm:
//       typeof rawFilters.searchTerm === 'string'
//         ? rawFilters.searchTerm
//         : undefined,
//   };
//   // If filters are empty, set them to undefined to fetch all events
//   if (
//     Object.keys(filters).length === 0 ||
//     Object.values(filters).every((value) => value === undefined)
//   ) {
//     filters.isPublic = undefined;
//     filters.isPaid = undefined;
//     filters.searchTerm = undefined;
//   }
//   const result = await EventService.getAllEventsFromDB(filters, options);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Event retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });
// get all events - for user
const getAllEventsByUserId = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rawFilters = (0, pick_1.default)(req.query, event_constant_1.eventFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const user = req.user;
    // Handle boolean conversion for 'isPublic' and 'isPaid' and ensure other filters are correctly handled
    const filters = {
        isPublic: rawFilters.isPublic === 'true'
            ? true
            : rawFilters.isPublic === 'false'
                ? false
                : undefined,
        isPaid: rawFilters.isPaid === 'true'
            ? true
            : rawFilters.isPaid === 'false'
                ? false
                : undefined,
        searchTerm: typeof rawFilters.searchTerm === 'string'
            ? rawFilters.searchTerm
            : undefined,
    };
    // If filters are empty, set them to undefined to fetch all events
    if (Object.keys(filters).length === 0 ||
        Object.values(filters).every((value) => value === undefined)) {
        filters.isPublic = undefined;
        filters.isPaid = undefined;
        filters.searchTerm = undefined;
    }
    const result = yield event_service_1.EventService.getEventsFromDB(filters, options, user.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Event retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// get all event -public
const getEvents = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rawFilters = (0, pick_1.default)(req.query, event_constant_1.eventFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    // const user = req.user;
    // Handle boolean conversion for 'isPublic' and 'isPaid' and ensure other filters are correctly handled
    const filters = {
        isPublic: rawFilters.isPublic === 'true'
            ? true
            : rawFilters.isPublic === 'false'
                ? false
                : undefined,
        isPaid: rawFilters.isPaid === 'true'
            ? true
            : rawFilters.isPaid === 'false'
                ? false
                : undefined,
        searchTerm: typeof rawFilters.searchTerm === 'string'
            ? rawFilters.searchTerm
            : undefined,
    };
    // If filters are empty, set them to undefined to fetch all events
    if (Object.keys(filters).length === 0 ||
        Object.values(filters).every((value) => value === undefined)) {
        filters.isPublic = undefined;
        filters.isPaid = undefined;
        filters.searchTerm = undefined;
    }
    const result = yield event_service_1.EventService.getEventsFromDB(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Event retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// get event by id
const getEventById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield event_service_1.EventService.getEventByIdFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Event retrieval successfully',
        data: result,
    });
}));
//update event
const updateEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const file = req.file;
    const creatorId = req.user.id;
    const eventData = Object.assign(Object.assign({}, req.body), { creatorId, eventImgUrl: file === null || file === void 0 ? void 0 : file.path });
    const result = yield event_service_1.EventService.updateEventIntoDB(id, eventData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Event updated successfully',
        data: result,
    });
}));
// delete event
const deleteFromDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield event_service_1.EventService.deleteEventFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Event deleted successfully',
        data: result,
    });
}));
// join free public event
// const joinPublicEvent = catchAsync(async (req, res) => {
//   const { id: eventId } = req.params;
//   const userId = req.user?.userId;
//   console.log(userId);
//   // if (!userId) {
//   //   throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
//   // }
//   const result = await EventService.joinPublicEvent(eventId, userId);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: 'Joined public event successfully',
//     data: result,
//   });
// });
// join public paid event
// const joinPaidEvent = catchAsync(async (req, res) => {
//   const { id: eventId } = req.params;
//   const userId = req.user?.userId;
// //  console.log(req.user, userId);
//   const result = await EventService.joinPublicPaidEvent(eventId, userId);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: 'Joined paid event successfully',
//     data: result,
//   });
// });
// handle public event
const handleJoinEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id: eventId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    // console.log(userId);
    if (!userId)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User ID missing');
    const result = yield event_service_1.EventService.joinToPublicEvent(eventId, userId);
    // console.log(result);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: `Join event ${result.status.toLocaleLowerCase()}`,
        data: result,
    });
}));
// handle paid event
const handleRequestEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id: eventId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User ID missing');
    const result = yield event_service_1.EventService.requestToPaidEvent(eventId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: `Request to join event ${result.status.toLocaleLowerCase()}`,
        data: result,
    });
}));
// GET /events/:id/participation-status
const getParticipationStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const eventId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'User ID missing');
    const result = yield event_service_1.EventService.getParticipationStatus(eventId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Participation status fetched',
        data: result,
    });
}));
// update Participant Status
const updateParticipantStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { participantId } = req.params;
    // console.log(req.body);
    const result = yield event_service_1.EventService.updateParticipantStatus(participantId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Participation ${req.body.status.toLowerCase()} successfully`,
        data: result,
    });
}));
const getAllEvents = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rawFilters = (0, pick_1.default)(req.query, event_constant_1.eventFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    // Handle boolean conversion for 'isPublic' and 'isPaid' and ensure other filters are correctly handled
    const filters = {
        isPublic: rawFilters.isPublic === 'true'
            ? true
            : rawFilters.isPublic === 'false'
                ? false
                : undefined,
        isPaid: rawFilters.isPaid === 'true'
            ? true
            : rawFilters.isPaid === 'false'
                ? false
                : undefined,
        searchTerm: typeof rawFilters.searchTerm === 'string'
            ? rawFilters.searchTerm
            : undefined,
    };
    // If filters are empty, set them to undefined to fetch all events
    if (Object.keys(filters).length === 0 ||
        Object.values(filters).every((value) => value === undefined)) {
        filters.isPublic = undefined;
        filters.isPaid = undefined;
        filters.searchTerm = undefined;
    }
    const result = yield event_service_1.EventService.getAllEventsFromDB(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Event retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
exports.EventController = {
    createEvent,
    getEvents,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteFromDB,
    handleJoinEvent,
    handleRequestEvent,
    getParticipationStatus,
    updateParticipantStatus,
    getAllEventsByUserId
    // adminDeleteEvent,
};
