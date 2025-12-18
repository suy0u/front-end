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
      orange: "#fdc068",
      red: "#eb7171ff",
      cyan: "#40ceb5",
      white: "#fff",
      dark_blue: "#003366",
      grey: "#cececeff",

      signInBg: "#1C5F4A",
      signInHover: "#154538",

      signUpBg: "#BDEFFF",
      signUpText: "#14302A",
      signUpHover: "#FFDD40",
      signUpActiveShadow: "#2D6F63",
      optionButton: {
        text: "#6b4e4a",
        border: "#e6dcd8",
        borderActive: "#c7a9a2",
        bg: "#faf6f4",
        bgHover: "#f1e7e3",
        bgActive: "#f3dcd7",
        shadow: "rgba(199,169,162,0.35)",
      },
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
        {
          props: { variant: "manageCard" },
          style: ({ theme }) => ({
            borderRadius: 40,
            padding: theme.spacing(4),
            marginTop: theme.spacing(4),
            backgroundColor: theme.palette.custom.pink,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          }),
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "999px",
          fontWeight: 1000,
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
          props: { variant: "orange" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.orange,
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
        {
          props: { variant: "option" },
          style: ({ theme }) => {
            const c = theme.palette.custom.optionButton;

            return {
              border: `2px solid ${c.border}`,
              backgroundColor: c.bg,
              color: c.text,
              transition: "all 0.2s ease",

              "&:hover": {
                backgroundColor: c.bgHover,
              },

              "&.Mui-selected": {
                backgroundColor: c.bgActive,
                borderColor: c.borderActive,
                boxShadow: `0 6px 16px ${c.shadow}`,
              },

              "&:active": {
                transform: "scale(0.97)",
              },
            };
          },
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
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: "#F9FFF6",
          border: `2px solid ${theme.palette.custom.dark}`,
          boxShadow: "0 4px 0 rgba(0,0,0,0.2)",
          transition: "all .2s ease",
          color: theme.palette.custom.signInBg,

          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 0 rgba(0,0,0,0.25)",
            backgroundColor: "#ffffff",
          },

          "&:active": {
            transform: "translateY(2px)",
            boxShadow: "none",
          },

          "& svg": {
            fontSize: 28,
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 700,
          borderRadius: "8px",
          color: theme.palette.custom.white,
          textTransform: "uppercase",
          fontSize: 11,
        }),
      },

      variants: [
        {
          props: { size: "sm" },
          style: {
            height: 18,
            minHeight: 18,
            fontSize: 10,
            lineHeight: "18px",
            padding: 0,
            "& .MuiChip-label": {
              padding: "0 8px",
            },
          },
        },
        {
          props: { size: "md" },
          style: {
            padding: "4px 20px",
            fontSize: 12,
          },
        },
        {
          props: { size: "lg" },
          style: {
            padding: "4px 20px",
            fontSize: 12,
          },
        },
        {
          props: { variant: "companyPublic" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.cyan,
            color: theme.palette.custom.dark,
          }),
        },
        {
          props: { variant: "companyPrivate" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.red,
            color: theme.palette.custom.dark,
          }),
        },

        {
          props: { variant: "roleOwner" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.orange,
            color: theme.palette.custom.dark_blue,
          }),
        },
        {
          props: { variant: "roleAdmin" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.yellow,
            color: theme.palette.custom.dark_blue,
          }),
        },
        {
          props: { variant: "roleMember" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.purple,
          }),
        },
        {
          props: { variant: "inActive" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.custom.grey,
            color: theme.palette.custom.white,
          }),
        },
      ],
    },
  },
});
