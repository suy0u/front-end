import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import AppModal from "../../components/Modals/AppModal";
import { PageCard } from "../../components/Cards/PageCard";
import { UserProfileForm } from "../../components/UserPages/UserProfileForm";
import { UserProfileActions } from "../../components/UserPages/UserProfileActions";
import NotFoundPage from "../NotFoundPage";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUserById,
  updateUserThunk,
  deleteUserThunk,
  uploadAvatarThunk,
} from "../../store/slices/userSlice";
import { logout } from "../../store/slices/authSlice";
import { type UpdateUserPayload } from "../../types/user";

interface EditUserData {
  username: string;
  password: string;
  about: string;
  avatar_url: string;
}

export default function UserProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, loading, error } = useAppSelector((s) => s.users);
  const authUser = useAppSelector((s) => s.auth.user);

  const isSelf = Number(id) === authUser?.id;

  const [editMode, setEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editData, setEditData] = useState<EditUserData>({
    username: "",
    password: "",
    about: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [id, dispatch]);

  const startEdit = () => {
    if (!user) return;

    setEditData({
      username: user.username ?? "",
      password: user.password ?? "",
      about: user.about ?? "",
      avatar_url: user.avatar_url ?? "",
    });

    setEditMode(true);
  };

  const handleSave = useCallback(async () => {
    if (!id) return;

    const payload: UpdateUserPayload = {
      username: editData.username,
      about: editData.about,
      avatar_url: editData.avatar_url,
    };

    const passwordChanged = Boolean(editData.password);

    if (passwordChanged) {
      payload.password = editData.password;
    }

    await dispatch(
      updateUserThunk({
        id: Number(id),
        data: payload,
      })
    ).unwrap();

    if (passwordChanged) {
      dispatch(logout());
      navigate("/login");
      return;
    }

    setEditMode(false);
  }, [dispatch, id, editData, navigate]);

  const handleDelete = useCallback(() => {
    if (!id) return;

    dispatch(deleteUserThunk(Number(id))).then(() => {
      dispatch(logout());
      navigate("/login");
    });
  }, [dispatch, id, navigate]);

  const handleAvatarUpload = async (file: File) => {
    const updatedUser = await dispatch(uploadAvatarThunk(file)).unwrap();

    setEditData((prev) => ({
      ...prev,
      avatar_url: updatedUser.avatar_url ?? "",
    }));
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
      <PageCard>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
          {t("profile.user_profile")}
        </Typography>

        <UserProfileForm
          username={editMode ? editData.username : user.username}
          about={editMode ? editData.about : user.about}
          avatarUrl={editMode ? editData.avatar_url : user.avatar_url}
          onAvatarUpload={handleAvatarUpload}
          email={user.email}
          authProviderId={user.auth_provider_id}
          editMode={editMode}
          onChange={(field, value) =>
            setEditData((prev) => ({ ...prev, [field]: value }))
          }
        />

        <UserProfileActions
          isSelf={isSelf}
          editMode={editMode}
          onEdit={startEdit}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
          onDelete={() => setDeleteModalOpen(true)}
        />
      </PageCard>

      <AppModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={t("profile.delete_account")}
        actions={
          <>
            <Button size="sm" variant="orange" onClick={handleDelete}>
              {t("actions.delete")}
            </Button>
            <Button
              size="sm"
              variant="yellow"
              onClick={() => setDeleteModalOpen(false)}
            >
              {t("actions.cancel")}
            </Button>
          </>
        }
      >
        {t("profile.delete_account_confirm")}
      </AppModal>
    </Box>
  );
}
