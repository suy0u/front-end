import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Button } from "@mui/material";

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
} from "../../store/slices/userSlice";
import { logout } from "../../store/slices/authSlice";
import { type UpdateUserPayload } from "../../types/user";

interface EditUserData {
  username: string;
  password: string;
}

export default function UserProfilePage() {
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
    });

    setEditMode(true);
  };

  const handleSave = useCallback(async () => {
    if (!id) return;

    const payload: UpdateUserPayload = {
      username: editData.username,
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

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return <NotFoundPage message="User not found" />;
  }

  return (
    <Box sx={{ py: 6 }}>
      <PageCard>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
          User Profile
        </Typography>

        <UserProfileForm
          username={editMode ? editData.username : user.username}
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
        title="Delete account"
        actions={
          <>
            <Button size="sm" variant="orange" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              size="sm"
              variant="yellow"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </>
        }
      >
        Are you sure you want to delete your account? This action cannot be
        undone.
      </AppModal>
    </Box>
  );
}
