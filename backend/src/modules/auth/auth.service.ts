import prisma from '../../app/shared/prisma';
import ApiError from '../../app/error/ApiError';
import httpStatus from 'http-status';
import { User } from '@prisma/client';
import { createToken } from '../../app/shared/createToken';
import bcrypt from 'bcryptjs';
import config from '../../app/config';
const authRegisterInToDB = async (payload: Partial<User>) => {
  const { name, email, password } = payload;

  // Optional: Add validation checks here.
  if (!name || !email || !password) {
    throw new ApiError(
      httpStatus.NON_AUTHORITATIVE_INFORMATION,
      'Missing required fields'
    );
  }
  console.log(payload);
  const isExistUser = await prisma.user.findFirst({
    where: { email: email },
  });
  console.log(isExistUser);

  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

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

  return registeredUser;
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

export const AuthService = {
  authRegisterInToDB,
  authLogingInToDb,
};
