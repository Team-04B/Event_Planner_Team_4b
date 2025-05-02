import { catchAsync } from "../../app/helper/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import httpStatus from "http-status";
import { InvitaionServices } from "./invitations.service";
import pick from "../../app/shared/pick";
// create reviews
const createInvitaion = catchAsync(async(req,res,next) => {
  const {id} = req.params
    const result = await InvitaionServices.createInvitaionDB(id,req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'Invitaion Send Successfully',
        data:result
    })
  })
// create reviews
const getMyAllnvitaions = catchAsync(async(req,res,next) => {
  const id = req.user?.id
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await InvitaionServices.getMyAllnvitaionsFromDB(options,id);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'Invitaion retrived Successfully',
        data:result
    })
  })

  export const InvitationController = {
     createInvitaion,
     getMyAllnvitaions
  }