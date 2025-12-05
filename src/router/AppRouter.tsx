import { Routes, Route } from "react-router-dom";
import UsersListPage from "../pages/Users/UsersListPage";
import UserProfilePage from "../pages/Users/UserProfilePage";
import CompaniesListPage from "../pages/Companies/CompaniesListPage";
import CompanyProfilePage from "../pages/Companies/CompanyProfilePage";
import HomePage from "../pages/HomePage";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />

    <Route path="/users" element={<UsersListPage />} />
    <Route path="/users/:id" element={<UserProfilePage />} />

    <Route path="/companies" element={<CompaniesListPage />} />
    <Route path="/companies/:id" element={<CompanyProfilePage />} />
  </Routes>
);

export default AppRouter;
