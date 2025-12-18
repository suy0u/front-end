import { Routes, Route } from "react-router-dom";
import UsersListPage from "../pages/Users/UsersListPage";
import UserProfilePage from "../pages/Users/UserProfilePage";
import CompaniesListPage from "../pages/Companies/CompaniesListPage";
import CompanyProfilePage from "../pages/Companies/CompanyProfilePage";
import HomePage from "../pages/HomePage";
import PrivateRoute from "../components/Authorization/PrivateRoute";
import LoginPage from "../pages/Authorization/LoginPage";
import RegisterPage from "../pages/Authorization/RegisterPage";
import QuizPage from "../pages/Quizzes/QuizPage";
import AuthCallback from "../pages/Authorization/AuthCallback";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route
      path="/users"
      element={
        <PrivateRoute>
          <UsersListPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/users/:id"
      element={
        <PrivateRoute>
          <UserProfilePage />
        </PrivateRoute>
      }
    />
    <Route
      path="/companies"
      element={
        <PrivateRoute>
          <CompaniesListPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/companies/:id"
      element={
        <PrivateRoute>
          <CompanyProfilePage />
        </PrivateRoute>
      }
    />{" "}
    <Route
      path="/companies/:companyId/quizzes/:quizId"
      element={
        <PrivateRoute>
          <QuizPage />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRouter;
