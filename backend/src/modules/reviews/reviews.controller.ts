import { catchAsync } from "../../app/helper/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import { ReviewServices } from "./reviews.service";
import httpStatus from "http-status";
const createReview = catchAsync(async(req,res,next) => {
const {id} = req.params
  const result = await ReviewServices.createReviewIntoDB(id,req.body);
  sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:'User Register Successfully',
      data:result
  })
})

export const ReviewController = {
  createReview
}