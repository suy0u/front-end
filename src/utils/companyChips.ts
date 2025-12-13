export const getVisibilityVariant = (isPublic: boolean) =>
  isPublic ? "companyPublic" : "companyPrivate";

export const getRoleVariant = (role: "OWNER" | "ADMIN" | "MEMBER") =>
  role === "OWNER"
    ? "roleOwner"
    : role === "ADMIN"
    ? "roleAdmin"
    : "roleMember";
