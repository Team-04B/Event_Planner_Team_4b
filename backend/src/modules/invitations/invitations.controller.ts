import { catchAsync } from "../../app/helper/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import httpStatus from "http-status";
import { InvitaionServices } from "./invitations.service";
// create reviews
const createInvitaion = catchAsync(async(req,res,next) => {
  const {id} = req.params
    const result = await InvitaionServices.createInvitaionDB(id,req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'Invitaion created Successfully',
        data:result
    })
  })
  
  export const InvitationController = {
     createInvitaion
  }