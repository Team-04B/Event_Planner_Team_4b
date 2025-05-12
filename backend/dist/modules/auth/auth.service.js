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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../app/shared/prisma"));
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createToken_1 = require("../../app/shared/createToken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../app/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRegisterInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = payload;
    // console.log(payload);
    // Optional: Add validation checks here.
    if (!name || !email || !password) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, 'Missing required fields');
    }
    const isExistUser = yield prisma_1.default.user.findFirst({
        where: { email: email },
    });
    // const isExistUser = await prisma.user.findFirst({
    //   where: { email: email },
    // });
    // if (isExistUser) {
    //   throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
    // }
    const hasPassword = yield bcryptjs_1.default.hash(password, 10);
    if (!hasPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'bcrypt solt generate problem');
    }
    const registeredUser = yield prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hasPassword,
        },
    });
    if (!registeredUser.id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'user create problem');
    }
    const jwtPayload = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        role: registeredUser.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt.jwt_scret, config_1.default.jwt.expires_in);
    return accessToken;
});
const authLogingInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.email || !payload.password) {
        throw new ApiError_1.default(http_status_1.default.NON_AUTHORITATIVE_INFORMATION, 'Missing required fields');
    }
    const isExistUser = yield prisma_1.default.user.findFirst({
        where: { email: payload.email },
    });
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invilide email or password please try agin');
    }
    const checkPassword = yield bcryptjs_1.default.compare(payload.password, isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.password);
    if (!checkPassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invilide email or password please try agin');
    }
    const jwtPayload = {
        id: isExistUser.id,
        name: isExistUser.name,
        email: isExistUser.email,
        role: isExistUser.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt.jwt_scret, config_1.default.jwt.expires_in);
    const refeshToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    const result = {
        accessToken,
        refeshToken,
    };
    return result;
});
const refeshTokenInToForDb = (paylood) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = jsonwebtoken_1.default.verify(paylood, config_1.default.jwt.refresh_token_secret);
    const { email, role } = decode;
    if (!decode) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'you ar not authorized');
    }
    const isExistUser = yield prisma_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'you ar not authorized');
    }
    const jwtPayload = {
        id: isExistUser.id,
        name: isExistUser.name,
        email: isExistUser.email,
        role: isExistUser.role,
    };
    const accessToken = (0, createToken_1.createToken)(jwtPayload, config_1.default.jwt.jwt_scret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const chengePasswordForDb = (user, paylood) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const isExistUser = yield prisma_1.default.user.findUnique({ where: { email: email } });
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'you ar not authorized');
    }
    const checkPassword = yield bcryptjs_1.default.compare(paylood === null || paylood === void 0 ? void 0 : paylood.oldPassword, isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.password);
    if (!checkPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invilide old password please try agin');
    }
    const hasPassword = yield bcryptjs_1.default.hash(paylood.newPassword, 10);
    if (!hasPassword) {
        throw new Error('password solt generate problem ');
    }
    const result = yield prisma_1.default.user.update({
        where: { email: isExistUser.email },
        data: { password: hasPassword },
    });
    return result;
});
exports.AuthService = {
    authRegisterInToDB,
    authLogingInToDb,
    refeshTokenInToForDb,
    chengePasswordForDb,
};
