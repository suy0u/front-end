import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Menu, MenuItem, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget as HTMLElement);
  const handleClose = () => setAnchorEl(null);

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    handleClose();
  };

  return (
    <Box>
      <Button
        size="sm"
        variant="yellow"
        onClick={handleOpen}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {i18n.language.toUpperCase()}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => changeLang("en")}>English</MenuItem>
        <MenuItem onClick={() => changeLang("ua")}>Українська</MenuItem>
      </Menu>
    </Box>
  );
}
