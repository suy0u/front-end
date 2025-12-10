import { useState } from "react";
import { Box, Menu, MenuItem, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLanguage } from "../../store/slices/languageSlice";

export function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.language.current);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const changeLang = (lng: string) => {
    dispatch(setLanguage(lng));
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
        {lang.toUpperCase()}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => changeLang("en")}>English</MenuItem>
        <MenuItem onClick={() => changeLang("ua")}>Українська</MenuItem>
      </Menu>
    </Box>
  );
}
