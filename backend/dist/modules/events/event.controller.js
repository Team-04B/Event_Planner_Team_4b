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
const createEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventData = req.body;
    // console.log(eventData);
    const result = yield event_service_1.EventService.createEventIntoDB(eventData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Event created successfully',
        data: result,
    });
}));
const getEvents = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield event_service_1.EventService.getEventsFromDB(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Event retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
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
const updateEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield event_service_1.EventService.updateEventIntoDB(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Event updated successfully',
        data: result,
    });
}));
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
const joinPublicEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: eventId } = req.params;
    const userId = req.body.userId;
    const result = yield event_service_1.EventService.joinPublicEvent(eventId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Joined public event successfully',
        data: result,
    });
}));
const joinPaidEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: eventId } = req.params;
    // console.log(req.params);
    const userId = req.body.userId;
    const result = yield event_service_1.EventService.joinPaidEvent(eventId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Joined paid event successfully',
        data: result,
    });
}));
const approveParticipant = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { participantId } = req.params;
    const result = yield event_service_1.EventService.approveParticipant(participantId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Participation approved successfully',
        data: result,
    });
}));
exports.EventController = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteFromDB,
    joinPublicEvent,
    joinPaidEvent,
    approveParticipant,
};
