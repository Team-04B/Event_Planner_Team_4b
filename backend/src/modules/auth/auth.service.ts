import prisma from '../../app/shared/prisma';
import ApiError from '../../app/error/ApiError';
import httpStatus from 'http-status';
import { ActivityAction, ActivityType, User } from '@prisma/client';
import { createToken } from '../../app/shared/createToken';
import bcrypt from 'bcryptjs';
import config from '../../app/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { logActivity } from '../logActivity';

const authRegisterInToDB = async (payload: Partial<User>) => {
  const { name, email, password } = payload;
  // console.log(payload);
  // Optional: Add validation checks here.
  if (!name || !email || !password) {
    throw new ApiError(
      httpStatus.NON_AUTHORITATIVE_INFORMATION,
      'Missing required fields'
    );
  }

  const isExistUser = await prisma.user.findFirst({
    where: { email: email },
  });

  // const isExistUser = await prisma.user.findFirst({
  //   where: { email: email },
  // });

  // if (isExistUser) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  // }

  const hasPassword = await bcrypt.hash(password, 10);
  if (!hasPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'bcrypt solt generate problem');
  }
  const registeredUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hasPassword,
    },
  });

  // user logactivity
  await logActivity({
    type: ActivityType.USER,
    action: ActivityAction.CREATED,
    description: `User ${registeredUser.name} signed up`,
    userId: registeredUser.id,
  });

  if (!registeredUser.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user create problem');
  }
  const jwtPayload = {
    id: registeredUser.id,
    name: registeredUser.name,
    email: registeredUser.email,
    role: registeredUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_scret as string,
    config.jwt.expires_in as string
  );
  return accessToken;
};
const authLogingInToDb = async (payload: Partial<User>) => {
  if (!payload.email || !payload.password) {
    throw new ApiError(
      httpStatus.NON_AUTHORITATIVE_INFORMATION,
      'Missing required fields'
    );
  }
  const isExistUser = await prisma.user.findFirst({
    where: { email: payload.email },
  });

  if (!isExistUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invilide email or password please try agin'
    );
  }

  const checkPassword = await bcrypt.compare(
    payload.password,
    isExistUser?.password
  );

  if (!checkPassword) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Invilide email or password please try agin'
    );
  }
  const jwtPayload = {
    id: isExistUser.id,
    name: isExistUser.name,
    email: isExistUser.email,
    role: isExistUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_scret as string,
    config.jwt.expires_in as string
  );
  const refeshToken = createToken(
    jwtPayload,
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
  );

  const result = {
    accessToken,
    refeshToken,
  };
  return result;
};
const refeshTokenInToForDb = async (paylood: string) => {
  const decode = jwt.verify(paylood, config.jwt.refresh_token_secret as string);

  const { email, role } = decode as JwtPayload;
  if (!decode) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you ar not authorized');
  }
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'you ar not authorized');
  }
  const jwtPayload = {
    id: isExistUser.id,
    name: isExistUser.name,
    email: isExistUser.email,
    role: isExistUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_scret as string,
    config.jwt.expires_in as string
  );
  return {
    accessToken,
  };
};
const chengePasswordForDb = async (
  user: any,
  paylood: { newPassword: string; oldPassword: string }
) => {
  const { email } = user;
  const isExistUser = await prisma.user.findUnique({ where: { email: email } });

  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'you ar not authorized');
  }

  const checkPassword = await bcrypt.compare(
    paylood?.oldPassword,
    isExistUser?.password
  );

  if (!checkPassword) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invilide old password please try agin'
    );
  }
  const hasPassword = await bcrypt.hash(paylood.newPassword, 10);
  if (!hasPassword) {
    throw new Error('password solt generate problem ');
  }
  const result = await prisma.user.update({
    where: { email: isExistUser.email },
    data: { password: hasPassword },
  });

  return result;
};
export const AuthService = {
  authRegisterInToDB,
  authLogingInToDb,
  refeshTokenInToForDb,
  chengePasswordForDb,
};
