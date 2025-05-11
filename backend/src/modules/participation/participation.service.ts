import { Invitation } from '@prisma/client';
import prisma from '../../app/shared/prisma';

// respond invitation
const respondToInvitation = async (id: string, data: Partial<Invitation>) => {
  await prisma.invitation.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.invitation.update({
    where: { id },
    data,
  });
  return result;
};

// get pending invitations
const getPendingInvitationsByUser = async (userId: string) => {
  const invitations = await prisma.participation.findMany({
    where: {
      userId,
      status: 'PENDING',
    },
    include: {
      event: true,
    },
  });

  return invitations;
};

export const ParticipationService = {
  respondToInvitation,
  getPendingInvitationsByUser,
};
