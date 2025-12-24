import { Dialog, DialogContent, Box, Button } from "@mui/material";
import { ModalTitle } from "../Typography/ModalTitle";

interface AppModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function AppModal({
  open,
  title,
  onClose,
  children,
  actions,
}: AppModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          onClick: (e: React.MouseEvent) => e.stopPropagation(),
          sx: {
            borderRadius: "32px",
            backgroundColor: "#F9F9F5",
            px: 4,
            py: 5,
          },
        },
      }}
    >
      <ModalTitle>{title}</ModalTitle>

      <DialogContent sx={{ p: 0, textAlign: "center" }}>
        {children}
      </DialogContent>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {actions || (
          <Button size="sm" variant="yellow" onClick={onClose}>
            Close
          </Button>
        )}
      </Box>
    </Dialog>
  );
}
