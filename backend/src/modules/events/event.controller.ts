import { catchAsync } from '../../app/helper/catchAsync';
import { sendResponse } from '../../app/shared/sendResponse';
import httpStatus from 'http-status';
import { EventService } from './event.service';
import pick from '../../app/shared/pick';
import { eventFilterableFields } from './event.constant';
import { IEventFilterRequest } from './event.interface';
import ApiError from '../../app/error/ApiError';
import { fileUploder } from '../../app/helper/fileUploader';
import { IFile } from '../../app/interface/file';

// create event
const createEvent = catchAsync(async (req, res) => {
  const file = req.file as Express.Multer.File;
  const creatorId = req.user.id;

  // Simplified mapping to IFile
  const mappedFile: IFile = {
    // fileName: file.filename,
    orginalname: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    destination: file.destination,
    filename: file.filename,
    path: file.path,
    size: file.size,
  };
  // console.log(eventData);

  // Upload the file to Cloudinary
  const uploadedImage = await fileUploder.uploadToCloudinary(mappedFile);
  const eventData = {
    ...req.body,
    creatorId,
    eventImgUrl: uploadedImage?.secure_url, // set image URL
  };
  const result = await EventService.createEventIntoDB(eventData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Event created successfully',
    data: result,
  });
});

// get all event
const getEvents = catchAsync(async (req, res) => {
  const rawFilters = pick(req.query, eventFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const user = req.user

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

  const result = await EventService.getEventsFromDB(filters, options,user.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get event by id
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

//update event
const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const file = req.file as Express.Multer.File;
  const creatorId = req.user.id;
  
  // Simplified mapping to IFile
  const mappedFile: IFile = {
    // fileName: file.filename,
    orginalname: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    destination: file.destination,
    filename: file.filename,
    path: file.path,
    size: file.size,
  };
  // console.log(eventData);

  // Upload the file to Cloudinary
  const uploadedImage = await fileUploder.uploadToCloudinary(mappedFile);
  const eventData = {
    ...req.body,
    creatorId,
    eventImgUrl: uploadedImage?.secure_url, // set image URL
  };

  const result = await EventService.updateEventIntoDB(id, eventData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event updated successfully',
    data: result,
  });
});

// delete event
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
const handleJoinEvent = catchAsync(async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.user?.id;
  // console.log(userId);
  if (!userId) throw new ApiError(httpStatus.UNAUTHORIZED, 'User ID missing');
  const result = await EventService.joinToPublicEvent(eventId, userId);
  console.log(result);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: `Join event ${result.status.toLocaleLowerCase()}`,
    data: result,
  });
});

// handle paid event
const handleRequestEvent = catchAsync(async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.user?.id;
  if (!userId) throw new ApiError(httpStatus.UNAUTHORIZED, 'User ID missing');

  const result = await EventService.requestToPaidEvent(eventId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: `Request to join event ${result.status.toLocaleLowerCase()}`,
    data: result,
  });
});

// update Participant Status
const updateParticipantStatus = catchAsync(async (req, res) => {
  const { participantId } = req.params;
  // console.log(req.body);
  const result = await EventService.updateParticipantStatus(
    participantId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Participation ${req.body.status.toLowerCase()} successfully`,
    data: result,
  });
});

export const EventController = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteFromDB,
  handleJoinEvent,
  handleRequestEvent,
  updateParticipantStatus,
};
