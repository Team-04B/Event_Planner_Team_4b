import { catchAsync } from "../../app/helper/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const registerUser = catchAsync(async(req,res,next) => {
    const result = await AuthService.authRegisterInToDB(req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'User Register Successfully',
        data:result
    })
})

export const AuthController = {
    registerUser
}