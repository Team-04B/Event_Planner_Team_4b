import { JwtPayload } from 'jsonwebtoken';
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
    data: {
      accessToken: result,
    },
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
const refeshToken = catchAsync(async (req, res) => {
  const { refeshToken } = req.cookies;
  const result = await AuthService.refeshTokenInToForDb(refeshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'refesh token Successfully get the access',
    data: result,
  });
});
const cheangePassword = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const result = await AuthService.chengePasswordForDb(user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'your password succes fully cheanged',
  });
});

export const AuthController = {
  registerUser,
  logingUser,
  refeshToken,
  cheangePassword,
};
