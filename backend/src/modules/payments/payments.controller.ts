import { catchAsync } from "../../app/helper/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import httpStatus from 'http-status'
import { PaymentService } from "./payments.service";

const initPayment = catchAsync(async(req,res)=>{
    
    const payload = req.body

    const user = req.user

    
    const result = await PaymentService.initPayment(payload,user.id);

    console.log(result,'asdfsadfsdafsa')

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:"Payment Initate successfully",
        data:result
    })
})

const validationPayment = catchAsync(async(req,res)=> {

    const result = await PaymentService.validationPayment(req.query);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:"Payment Validate successfully",
        data:result
    })
})

export const PaymentController = {
    initPayment,
    validationPayment
}