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
exports.ParticipationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../app/helper/catchAsync");
const participation_service_1 = require("./participation.service");
const sendResponse_1 = require("../../app/shared/sendResponse");
const pick_1 = __importDefault(require("../../app/shared/pick"));
const participation_constant_1 = require("./participation.constant");
// respond invitation
const updateParticipantStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { invitationId } = req.params;
    const result = yield participation_service_1.ParticipationService.respondToInvitation(invitationId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Invitation ${req.body.status.toLowerCase()} successfully`,
        data: result,
    });
}));
const getPendingParticipations = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const rawFilters = (0, pick_1.default)(req.query, participation_constant_1.participationFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const filters = {
        searchTerm: typeof rawFilters.searchTerm === 'string'
            ? rawFilters.searchTerm
            : undefined,
        paid: rawFilters.paid === 'true'
            ? 'true'
            : rawFilters.paid === 'false'
                ? 'false'
                : undefined,
    };
    // If filters are empty, set them all to undefined
    if (Object.keys(filters).length === 0 ||
        Object.values(filters).every((value) => value === undefined)) {
        filters.searchTerm = undefined;
        filters.paid = undefined;
    }
    const result = yield participation_service_1.ParticipationService.getPendingParticipations(filters, options, user.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Pending participations fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
exports.ParticipationController = {
    updateParticipantStatus,
    getPendingParticipations
};
