import { catchAsync } from "../../app/helper/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import { ReviewServices } from "./reviews.service";
import httpStatus from "http-status";


// create reviews
const createReview = catchAsync(async(req,res,next) => {
const {id} = req.params
  const result = await ReviewServices.createReviewIntoDB(id,req.body);
  sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:'Review created Successfully',
      data:result
  })
})
// update reviews
const updateReview = catchAsync(async(req,res,next) => {
const {id} = req.params
  const result = await ReviewServices.updateReviewIntoDB(id,req.body);
  sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:'Review updated Successfully',
      data:result
  })
})
const getAllReviews = catchAsync(async(req,res,next) => {
const {id} = req.params
  const result = await ReviewServices.getAllReviewFromDB(id);
  sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:'Reviews retrived Successfully',
      data:result
  })
})

export const ReviewController = {
  createReview,
  getAllReviews,
  updateReview
}