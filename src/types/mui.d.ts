import "@mui/material/styles";
import "@mui/material/Button";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      purple: string;
      pink: string;
      mint: string;
      blue: string;
      green: string;
      dark: string;

      signInBg: string;
      signInHover: string;

      signUpBg: string;
      signUpText: string;
      signUpHover: string;
      signUpActiveShadow: string;
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
    signIn: true;
    signUp: true;
  }

  interface ButtonPropsSizeOverrides {
    sm: true;
    md: true;
    lg: true;
  }
}
