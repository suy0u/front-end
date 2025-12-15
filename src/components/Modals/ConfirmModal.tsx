import { Button } from "@mui/material";
import AppModal from "../Modals/AppModal";

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  confirmText: string;
  cancelText: string;
  confirmVariant?: "green" | "orange" | "yellow";
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  open,
  title,
  children,
  confirmText,
  cancelText,
  confirmVariant = "orange",
  onConfirm,
  onClose,
}: Props) {
  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={title}
      actions={
        <>
          <Button size="sm" variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button size="sm" variant="yellow" onClick={onClose}>
            {cancelText}
          </Button>
        </>
      }
    >
      {children}
    </AppModal>
  );
}
