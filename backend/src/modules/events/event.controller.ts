import { catchAsync } from '../../app/helper/catchAsync';
import { sendResponse } from '../../app/shared/sendResponse';
import httpStatus from 'http-status';
import { EventService } from './event.service';
import pick from '../../app/shared/pick';
import { eventFilterableFields } from './event.constant';
import { IEventFilterRequest } from './event.interface';
import ApiError from '../../app/error/ApiError';

const createEvent = catchAsync(async (req, res) => {
  const eventData = req.body;
  // console.log(eventData);
  const result = await EventService.createEventIntoDB(eventData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Event created successfully',
    data: result,
  });
});

const getEvents = catchAsync(async (req, res) => {
  const rawFilters = pick(req.query, eventFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  // Handle boolean conversion for 'isPublic' and 'isPaid' and ensure other filters are correctly handled
  const filters: IEventFilterRequest = {
    isPublic:
      rawFilters.isPublic === 'true'
        ? true
        : rawFilters.isPublic === 'false'
          ? false
          : undefined,
    isPaid:
      rawFilters.isPaid === 'true'
        ? true
        : rawFilters.isPaid === 'false'
          ? false
          : undefined,
    searchTerm:
      typeof rawFilters.searchTerm === 'string'
        ? rawFilters.searchTerm
        : undefined,
  };

  // If filters are empty, set them to undefined to fetch all events
  if (
    Object.keys(filters).length === 0 ||
    Object.values(filters).every((value) => value === undefined)
  ) {
    filters.isPublic = undefined;
    filters.isPaid = undefined;
    filters.searchTerm = undefined;
  }

  const result = await EventService.getEventsFromDB(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getEventById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EventService.getEventByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event retrieval successfully',
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventService.updateEventIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EventService.deleteEventFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  });
});

const joinPublicEvent = catchAsync(async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.body.userId;
  const result = await EventService.joinPublicEvent(eventId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Joined public event successfully',
    data: result,
  });
});

const joinPaidEvent = catchAsync(async (req, res) => {
  const { id: eventId } = req.params;
  // console.log(req.params);
  const userId = req.body.userId;
  const result = await EventService.joinPaidEvent(eventId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Joined paid event successfully',
    data: result,
  });
});

export const EventController = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteFromDB,
  joinPublicEvent,
  joinPaidEvent,
};
