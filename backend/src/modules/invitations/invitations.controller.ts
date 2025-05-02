import { catchAsync } from "../../app/helper/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import httpStatus from "http-status";
import { InvitaionServices } from "./invitations.service";
import { InvitaionFilterableFields } from "./invitations.constant";
import pick from "../../app/shared/pick";
import { IInvitaionsFilterRequest } from "./invitations.interface";
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
// get all reviews
const getAllInvitaion = catchAsync(async (req, res) => {
  const rawFilters = pick(req.query, InvitaionFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  // Handle boolean conversion for 'isPublic' and 'isPaid' and ensure other filters are correctly handled
  const filters: IInvitaionsFilterRequest = {
    paid:
      rawFilters.paid === 'true'
        ? true
        : rawFilters.paid === 'false'
          ? false
          : undefined,
    searchTerm:
      typeof rawFilters.searchTerm === 'string'
        ? rawFilters.searchTerm
        : undefined,
  };

  // If filters are empty, set them to undefined to fetch all events
  if (
    Object.keys(filters).length === 0 ||
    Object.values(filters).every((value) => value === undefined)
  ) {
    filters.paid = undefined;
    filters.searchTerm = undefined;
  }

  const result = await InvitaionServices.getAllInvitaionDB(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
  
  export const InvitationController = {
     createInvitaion,
     getAllInvitaion
  }