import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NotFoundPage from "../NotFoundPage";
import UserProfileHeader from "../../components/UserPages/UserProfileHeader";
import UserCompaniesSection from "../../components/UserPages/UserCompaniesSection";
import DeleteAccountModal from "../../components/Modals/Users/DeleteAccountModal";
import LeaveCompanyModal from "../../components/Modals/LeaveCompanyModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUserById,
  updateUserThunk,
  deleteUserThunk,
  uploadAvatarThunk,
} from "../../store/thunks/userThunks";
import { logout } from "../../store/slices/authSlice";
import {
  fetchMyCompanies,
  leaveCompanyThunk,
} from "../../store/thunks/membershipThunks";

import { type EditUserData } from "../../types/user";
import type { UpdateUserPayload } from "../../types/user";
import type { LeaveCompanyState } from "../../types/company";

const emptyEditData: EditUserData = {
  username: "",
  password: "",
  about: "",
  avatar_url: "",
};

export default function UserProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, loading, error } = useAppSelector((s) => s.users);
  const authUser = useAppSelector((s) => s.auth.user);
  const membership = useAppSelector((s) => s.membership);

  const isSelf = id === authUser?.id;

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(emptyEditData);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaveCompany, setLeaveCompany] = useState<LeaveCompanyState>(null);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchUserById(id));
    if (isSelf) dispatch(fetchMyCompanies());
  }, [id, isSelf, dispatch]);

  const startEdit = () => {
    if (!user) return;
    setEditData({
      username: user.username ?? "",
      password: "",
      about: user.about ?? "",
      avatar_url: user.avatar_url ?? "",
    });
    setEditMode(true);
  };

  const saveProfile = async () => {
    if (!id) return;

    const payload: UpdateUserPayload = {
      username: editData.username,
      about: editData.about,
      avatar_url: editData.avatar_url,
      ...(editData.password && { password: editData.password }),
    };

    await dispatch(updateUserThunk({ id, data: payload })).unwrap();

    if (editData.password) {
      dispatch(logout());
      navigate("/login");
      return;
    }

    setEditMode(false);
  };

  const deleteAccount = async () => {
    if (!id) return;
    await dispatch(deleteUserThunk(id));
    dispatch(logout());
    navigate("/login");
  };

  const uploadAvatar = async (file: File) => {
    const updated = await dispatch(uploadAvatarThunk(file)).unwrap();
    setEditData((p) => ({ ...p, avatar_url: updated.avatar_url ?? "" }));
  };

  const leaveSelectedCompany = async () => {
    if (!leaveCompany) return;
    await dispatch(leaveCompanyThunk(leaveCompany.company_id)).unwrap();
    setLeaveCompany(null);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return <NotFoundPage message={t("errors.page_not_found")} />;
  }

  return (
    <Box sx={{ py: 6 }}>
      <UserProfileHeader
        user={user}
        isSelf={isSelf}
        editMode={editMode}
        editData={editData}
        onEdit={startEdit}
        onSave={saveProfile}
        onCancel={() => setEditMode(false)}
        onDelete={() => setDeleteOpen(true)}
        onAvatarUpload={uploadAvatar}
        onChange={setEditData}
      />

      {isSelf && (
        <UserCompaniesSection
          membership={membership}
          onLeaveClick={setLeaveCompany}
        />
      )}

      <DeleteAccountModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={deleteAccount}
      />

      <LeaveCompanyModal
        company={leaveCompany}
        onClose={() => setLeaveCompany(null)}
        onConfirm={leaveSelectedCompany}
      />
    </Box>
  );
}
