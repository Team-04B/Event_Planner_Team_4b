import { catchAsync } from '../../app/helper/catchAsync';
import { sendResponse } from '../../app/shared/sendResponse';
import httpStatus from 'http-status';
import { EventService } from './event.service';
import pick from '../../app/shared/pick';

const createEvent = catchAsync(async (req, res) => {
  const eventData = req.body;
  console.log(eventData);
  const result = await EventService.createEventIntoDB(eventData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Event created successfully',
    data: result,
  });
});

const getEvents = catchAsync(async (req, res) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await EventService.getEventsFromDB(options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});


export const EventController = {
  createEvent,
  getEvents,
};
