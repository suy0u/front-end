export const canRequestJoin = ({
  isOwner,
  myMembership,
  hasPendingRequest,
  hasInvitation,
}: {
  isOwner: boolean;
  myMembership?: unknown;
  hasPendingRequest: boolean;
  hasInvitation: boolean;
}) => !isOwner && !myMembership && !hasPendingRequest && !hasInvitation;
