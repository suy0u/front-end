import { Grid, Button } from "@mui/material";
import { pinkButton } from "../styles/buttons/buttons";

export const ApiButtonGrid = () => (
  <Grid container spacing={2}>
    <Grid xs={12} sm={6} md="auto">
      <Button sx={pinkButton} fullWidth>
        API Docs
      </Button>
    </Grid>
  </Grid>
);
