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

// get pending invitations
const getMyPendingInvitations = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const invitations =
    await ParticipationService.getPendingInvitationsByUser(userId);
  res.status(httpStatus.OK).json(invitations);
});

// update Participant Status
const handleParticipantStatus = catchAsync(async (req, res) => {
  const { participantId } = req.params;
  // console.log(req.body);
  const result = await ParticipationService.updateParticipantStatus(
    participantId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Participation ${req.body.status.toLowerCase()} successfully`,
    data: result,
  });
});

export const ParticipationController = {
  updateParticipantStatus,
  getMyPendingInvitations,
  handleParticipantStatus,
};
