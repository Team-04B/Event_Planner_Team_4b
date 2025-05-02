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

export const ParticipationService = {
  respondToInvitation,
};
