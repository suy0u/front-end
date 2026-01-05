import "@mui/material/styles";
import "@mui/material/Button";
import "@mui/material/Chip";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      purple: string;
      pink: string;
      mint: string;
      blue: string;
      green: string;
      dark: string;
      yellow: string;
      orange: string;
      red: string;
      cyan: string;
      white: string;
      dark_blue: string;
      grey: string;

      signInBg: string;
      signInHover: string;

      signUpBg: string;
      signUpText: string;
      signUpHover: string;
      signUpActiveShadow: string;
      optionButton: {
        text: string;
        border: string;
        borderActive: string;
        bg: string;
        bgHover: string;
        bgActive: string;
        shadow: string;
      };
    };
  }

  interface PaletteOptions {
    custom?: Partial<Palette["custom"]>;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    pink: true;
    purple: true;
    mint: true;
    blue: true;
    green: true;
    yellow: true;
    orange: true;
    signIn: true;
    signUp: true;
    red: true;
    cyan: true;
    white: true;
    dark_blue: true;
    grey: true;
    option: true;
  }

  interface ButtonPropsSizeOverrides {
    sm: true;
    md: true;
    lg: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    companyCard: true;
    userCard: true;
    pageCard: true;
    manageCard: true;
    analyticsCard: true;
    toast: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    companyPublic: true;
    companyPrivate: true;
    roleOwner: true;
    roleAdmin: true;
    roleMember: true;
    inActive: true;
  }

  interface ChipPropsSizeOverrides {
    sm: true;
    md: true;
    lg: true;
  }
}
declare module "@mui/material/IconButton" {
  interface IconButtonPropsSizeOverrides {
    notification: true;
    toastClose: true;
  }
}
