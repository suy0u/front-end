import { Grid, Button } from "@mui/material";
import {
  purpleButton,
  mintButton,
  blueButton,
} from "../styles/buttons/buttons";

export const HealthCheckGrid = () => (
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
      <Button sx={purpleButton} fullWidth>
        App
      </Button>
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
      <Button sx={mintButton} fullWidth>
        Redis
      </Button>
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
      <Button sx={blueButton} fullWidth>
        DB
      </Button>
    </Grid>
  </Grid>
);
