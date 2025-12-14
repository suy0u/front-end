import { Button } from "@mui/material";
import AppModal from "./AppModal";
import { useAppDispatch } from "../../store/hooks";
import { deleteCompanyThunk } from "../../store/slices/companySlice";

interface DeleteCompanyModalProps {
  open: boolean;
  onClose: () => void;
  companyId: string;
}

export function DeleteCompanyModal({
  open,
  onClose,
  companyId,
}: DeleteCompanyModalProps) {
  const dispatch = useAppDispatch();

  const submit = async () => {
    await dispatch(deleteCompanyThunk(companyId)).unwrap();
    onClose();
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Delete company?"
      actions={
        <>
          <Button size="sm" color="error" onClick={submit}>
            Delete
          </Button>
          <Button size="sm" variant="yellow" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      Are you sure? This action cannot be undone.
    </AppModal>
  );
}
