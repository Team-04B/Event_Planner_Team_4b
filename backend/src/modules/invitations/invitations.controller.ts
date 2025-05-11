import { catchAsync } from '../../app/helper/catchAsync';
import { sendResponse } from '../../app/shared/sendResponse';
import httpStatus from 'http-status';
import { InvitaionServices } from './invitations.service';
import pick from '../../app/shared/pick';
// create reviews
const createInvitaion = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user?.id
  const result = await InvitaionServices.createInvitaionDB(id, req.body,userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Invitaion Send Successfully',
    data: result,
  });
});
// get reviews
const getMyAllnvitaions = catchAsync(async (req, res, next) => {
  const email = req.user?.email
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await InvitaionServices.getMyAllnvitaionsFromDB(options, email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Invitaion retrived Successfully',
    data: result,
  });
});
const getMySentInvitaions= catchAsync(async (req, res, next) => {
  const id = req.user?.id
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await InvitaionServices.getMyInvitedOnvitationsFromDB(options, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Invitaions retrived Successfully',
    data: result,
  });
});
const getSingleInvitaion= catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvitaionServices.getSingleInvitaionIntoDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Invitaion retrived Successfully',
    data: result,
  });
});
const acceptInvitaion= catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvitaionServices.acceptInvitaionInDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Invitaion accepted Successfully',
    data: result,
  });
});
const declineInvitaion= catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvitaionServices.declineInvitaionInDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Invitaion decline Successfully',
    data: result,
  });
});

export const InvitationController = {
  createInvitaion,
  getMyAllnvitaions,
  getMySentInvitaions,
  getSingleInvitaion,
  acceptInvitaion,
  declineInvitaion
};
