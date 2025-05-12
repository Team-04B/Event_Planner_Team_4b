export type IInvitaionsFilterRequest = {
  searchTerm?: string ;
  paid?: boolean;
};

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}