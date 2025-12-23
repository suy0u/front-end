import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import {
  fetchUserById,
  updateUserThunk,
  deleteUserThunk,
  uploadAvatarThunk,
} from "../../../store/thunks/userThunks";

import {
  fetchMyCompanies,
  leaveCompanyThunk,
} from "../../../store/thunks/membershipThunks";

import { logout } from "../../../store/slices/authSlice";

import type { EditUserData, UpdateUserPayload } from "../../../types/user";
import type { LeaveCompanyState } from "../../../types/membership";
import type { ListModalType } from "../../../types/common";

const emptyEditData: EditUserData = {
  username: "",
  password: "",
  about: "",
  avatar_url: "",
};

export function useUserProfilePage(id?: string) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useAppSelector((s) => s.users);
  const authUser = useAppSelector((s) => s.auth.user);
  const membership = useAppSelector((s) => s.membership);

  const isSelf = id === authUser?.id;

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<EditUserData>(emptyEditData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyToLeave, setCompanyToLeave] = useState<LeaveCompanyState>(null);
  const [listModal, setListModal] = useState<ListModalType>(null);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchUserById(id));

    if (isSelf) {
      dispatch(fetchMyCompanies());
    }
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

    setEditData((prev) => ({
      ...prev,
      avatar_url: updated.avatar_url ?? "",
    }));
  };

  const leaveSelectedCompany = async () => {
    if (!companyToLeave) return;

    await dispatch(leaveCompanyThunk(companyToLeave.company_id)).unwrap();

    await dispatch(fetchMyCompanies());
    setCompanyToLeave(null);
  };

  return {
    user,
    loading,
    error,
    membership,
    isSelf,

    editMode,
    editData,
    isDeleteModalOpen,
    companyToLeave,
    listModal,

    actions: {
      startEdit,
      saveProfile,
      deleteAccount,
      uploadAvatar,
      leaveSelectedCompany,

      setEditMode,
      setEditData,
      setIsDeleteModalOpen,
      setCompanyToLeave,
      setListModal,
    },
  };
}
