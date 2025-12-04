import { Button } from "@mui/material";
import { variants } from "../styles/buttons/variants";

interface Props {
  variant: "pink" | "blue" | "mint" | "purple" | "signIn" | "signUp";
  children: React.ReactNode;
}

export const ButtonUI = ({ variant, children }: Props) => (
  <Button sx={variants[variant]}>{children}</Button>
);
