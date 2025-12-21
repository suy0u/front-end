import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type {
  GlobalQuizRating,
  MyQuizAverage,
  CompanyMemberWeeklyScore,
  CompanyUserWeeklyQuizScore,
  CompanyUserLastAttempt,
  DateRangeParams,
  MyLastQuizCompletion,
} from "../types/analytics";

export const getMyGlobalQuizRating = (): Promise<GlobalQuizRating> =>
  withCatch(api.get("/api/analytics/me/global"), "getMyGlobalQuizRating");

export const getMyQuizAverages = (
  params?: DateRangeParams
): Promise<MyQuizAverage[]> =>
  withCatch(
    api.get("/api/analytics/me/quizzes", { params }),
    "getMyQuizAverages"
  );

export const getMyLastQuizCompletions = (): Promise<MyLastQuizCompletion[]> =>
  withCatch(
    api.get("/api/analytics/me/last-completions"),
    "getMyLastQuizCompletions"
  );

export const getCompanyMembersScoresWeekly = (
  companyId: string,
  params?: DateRangeParams
): Promise<CompanyMemberWeeklyScore[]> =>
  withCatch(
    api.get(`/api/analytics/companies/${companyId}/members/scores`, {
      params,
    }),
    "getCompanyMembersScoresWeekly"
  );

export const getCompanyUserQuizScoresWeekly = (
  companyId: string,
  userId: string,
  params?: DateRangeParams
): Promise<CompanyUserWeeklyQuizScore[]> =>
  withCatch(
    api.get(`/api/analytics/companies/${companyId}/users/${userId}/quizzes`, {
      params,
    }),
    "getCompanyUserQuizScoresWeekly"
  );

export const getCompanyUsersLastAttempts = (
  companyId: string
): Promise<CompanyUserLastAttempt[]> =>
  withCatch(
    api.get(`/api/analytics/companies/${companyId}/last-attempts`),
    "getCompanyUsersLastAttempts"
  );
