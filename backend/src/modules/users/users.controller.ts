import { catchAsync } from '../../app/helper/catchAsync';
import { sendResponse } from '../../app/shared/sendResponse';
import { userServices } from './users.service';
import httpStatus from 'http-status';
const getAllUsers = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await userServices.getAllUsersInToDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'get all user Successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleUsers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getSingleUsersInToDb(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'get single user Successfully',
    data: result,
  });
});
const updateSingleUsers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.updateUserInToDb(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'updated single user Successfully',
    data: result,
  });
});
const deletedSingleUsers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.deleteUserInToDb(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'deleted single user Successfully',
    data: result,
  });
});

export const UserContolors = {
  getAllUsers,
  getSingleUsers,
  updateSingleUsers,
  deletedSingleUsers,
};
