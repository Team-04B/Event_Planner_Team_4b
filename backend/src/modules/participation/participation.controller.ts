import httpStatus from 'http-status';
import { catchAsync } from '../../app/helper/catchAsync';
import { ParticipationService } from './participation.service';
import { sendResponse } from '../../app/shared/sendResponse';
import pick from '../../app/shared/pick';
import { participationFilterableFields } from './participation.constant';

// respond invitation
const updateParticipantStatus = catchAsync(async (req, res) => {
  const { invitationId } = req.params;
  const result = await ParticipationService.respondToInvitation(
    invitationId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Invitation ${req.body.status.toLowerCase()} successfully`,
    data: result,
  });
});


const getPendingParticipations = catchAsync(async (req, res) => {
  const user = req.user
  const rawFilters = pick(req.query, participationFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const filters = {
    searchTerm:
      typeof rawFilters.searchTerm === 'string'
        ? rawFilters.searchTerm
        : undefined,
    paid:
      rawFilters.paid === 'true'
        ? 'true'
        : rawFilters.paid === 'false'
        ? 'false'
        : undefined,
  };

  // If filters are empty, set them all to undefined
  if (
    Object.keys(filters).length === 0 ||
    Object.values(filters).every((value) => value === undefined)
  ) {
    filters.searchTerm = undefined;
    filters.paid = undefined;
  }

  const result = await ParticipationService.getPendingParticipations(
    filters,
    options,
    user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Pending participations fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const ParticipationController = {
  updateParticipantStatus,
  getPendingParticipations
};
