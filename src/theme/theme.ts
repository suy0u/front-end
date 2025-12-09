import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    background: {
      default: "#7DE9A2",
    },

    custom: {
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
    },
  },

  typography: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "999px",
          fontWeight: 700,
          textTransform: "uppercase",
          boxShadow: "none",
          border: `2px solid ${theme.palette.custom.dark}`,
          position: "relative",
          overflow: "visible",
          transition: "transform .2s ease, box-shadow .2s ease",
          color: theme.palette.custom.dark,

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
        }),
      },

      variants: [
        {
          props: { size: "sm" },
          style: {
            padding: "4px 20px",
            fontSize: 12,
          },
        },
        {
          props: { size: "md" },
          style: {
            padding: "12px 35px",
            fontSize: 14,
          },
        },
        {
          props: { size: "lg" },
          style: {
            padding: "14px 40px",
            fontSize: 16,
          },
        },

        // -------- colors --------
        {
          props: { variant: "pink" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.pink,
          }),
        },
        {
          props: { variant: "purple" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.purple,
          }),
        },
        {
          props: { variant: "mint" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.mint,
          }),
        },
        {
          props: { variant: "blue" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.blue,
          }),
        },

        // -------- sign in --------
        {
          props: { variant: "signIn" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.signInBg,
            color: "#fff",

            "&:hover": {
              backgroundColor: theme.palette.custom.signInHover,
            },
          }),
        },

        // -------- sign up --------
        {
          props: { variant: "signUp" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.signUpBg,
            color: theme.palette.custom.signUpText,

            "&:hover": {
              backgroundColor: theme.palette.custom.signUpHover,
            },

            "&:active": {
              boxShadow: `0 2px 0 ${theme.palette.custom.signUpActiveShadow}`,
            },
          }),
        },
      ],
    },
  },
});
