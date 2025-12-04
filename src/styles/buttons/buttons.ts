import type { SxProps, Theme } from "@mui/material";

const buttonColors = {
  purple: "#e8b9ff",
  pink: "#ffd6dd",
  mint: "#d2f2e1",
  blue: "#c9f6ff",
  green: "#ccf2d1",
  dark: "#1d5b4e",
  signInBg: "#1C5F4A",
  signInHover: "#154538",

  signUpBg: "#BDEFFF",
  signUpText: "#14302A",
  signUpHover: "#FFDD40",
  signUpActiveShadow: "#2D6F63",
};

const buttonSizes = {
  sm: {
    px: 3,
    py: 0.5,
    fontSize: 12,
  },
  md: {
    px: 3,
    py: 1.5,
    fontSize: 14,
  },
  lg: {
    px: 4,
    py: 2,
    fontSize: 16,
  },
};

const buttonBase = {
  borderRadius: "999px",
  fontWeight: 700,
  textTransform: "uppercase",
  boxShadow: "none",
  border: `2px solid ${buttonColors.dark}`,
  position: "relative",
  overflow: "visible",
  transition: "transform .2s ease, box-shadow .2s ease",
  color: buttonColors.dark,

  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: -1,
    left: 6,
    bottom: -6,
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    transition: "transform .2s ease",
  },

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 0 rgba(0,0,0,0.2)",
    backgroundColor: "inherit",
    "&:before": {
      transform: "translateY(2px)",
    },
  },

  "&:active": {
    transform: "translateY(2px)",
    boxShadow: "none",
    "&:before": {
      transform: "translateY(-2px)",
    },
  },
};

export const pinkButton: SxProps<Theme> = {
  ...buttonBase,
  ...buttonSizes.md,
  backgroundColor: buttonColors.pink,
};

export const purpleButton: SxProps<Theme> = {
  ...buttonBase,
  ...buttonSizes.md,
  backgroundColor: buttonColors.purple,
};

export const mintButton: SxProps<Theme> = {
  ...buttonBase,
  ...buttonSizes.md,
  backgroundColor: buttonColors.mint,
};

export const blueButton: SxProps<Theme> = {
  ...buttonBase,
  ...buttonSizes.md,
  backgroundColor: buttonColors.blue,
};

export const signInButton = {
  ...buttonBase,
  ...buttonSizes.sm,
  backgroundColor: buttonColors.signInBg,
  color: "#fff",

  "&:hover": {
    ...buttonBase["&:hover"],
    backgroundColor: buttonColors.signInHover,
  },
};

export const signUpButton: SxProps<Theme> = {
  ...buttonBase,
  ...buttonSizes.sm,
  backgroundColor: buttonColors.signUpBg,
  color: buttonColors.signUpText,

  "&:hover": {
    ...buttonBase["&:hover"],
    backgroundColor: buttonColors.signUpHover,
  },
  "&:active": {
    ...buttonBase["&:active"],
    boxShadow: `0 2px 0 ${buttonColors.signUpActiveShadow}`,
  },
};
