import { catchAsync } from '../../app/helper/catchAsync';
import { sendResponse } from '../../app/shared/sendResponse';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';

const registerUser = catchAsync(async (req, res, next) => {
  const result = await AuthService.authRegisterInToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User Register Successfully',
  });
});

const logingUser = catchAsync(async (req, res) => {
  const result = await AuthService.authLogingInToDb(req.body);
  res.cookie('refeshToken', result.refeshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User Successfully login',
    data: {
      accessToken: result.accessToken,
    },
  });
});

export const AuthController = {
  registerUser,
  logingUser,
};
