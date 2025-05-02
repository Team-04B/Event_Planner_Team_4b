import httpStatus from 'http-status';
import { catchAsync } from '../../app/helper/catchAsync';
import { ParticipationService } from './participation.service';
import { sendResponse } from '../../app/shared/sendResponse';

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

export const ParticipationController = {
  updateParticipantStatus,
};
