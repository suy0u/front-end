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
      yellow: "#FFE66D",

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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
        },
      },
      variants: [
        {
          props: { variant: "companyCard" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.blue,
            "&:hover": {
              backgroundColor: theme.palette.custom.blue,
              opacity: 0.9,
            },
          }),
        },
        {
          props: { variant: "userCard" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.green,
            "&:hover": {
              backgroundColor: theme.palette.custom.green,
              opacity: 0.9,
            },
          }),
        },
        {
          props: { variant: "pageCard" },
          style: ({ theme }) => ({
            borderRadius: 40,
            padding: theme.spacing(4),
            backgroundColor: theme.palette.custom.yellow,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          }),
        },
      ],
    },
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
        {
          props: { variant: "green" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.green,
          }),
        },
        {
          props: { variant: "yellow" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.yellow,
          }),
        },

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
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: "999px",
          backgroundColor: theme.palette.custom.mint,
          border: `2px solid ${theme.palette.custom.dark}`,
          boxShadow: "0 4px 0 rgba(0,0,0,0.2)",
          overflow: "hidden",
          padding: theme.spacing(0.5, 1),
          marginTop: theme.spacing(1),

          "& .MuiMenuItem-root": {
            fontWeight: 700,
            fontSize: 12,
            textTransform: "uppercase",
            borderRadius: "999px",
            padding: theme.spacing(1, 2),
            color: theme.palette.custom.dark,
            transition: "all 0.15s ease",
          },

          "& .MuiMenuItem-root:hover": {
            backgroundColor: theme.palette.custom.green,
          },

          "& .MuiMenuItem-root.Mui-selected": {
            backgroundColor: theme.palette.custom.blue,
          },
        }),
      },
    },
  },
});
