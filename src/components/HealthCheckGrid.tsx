import { Grid, Button } from "@mui/material";

export const HealthCheckGrid = () => (
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
      <Button size="md" variant="purple" fullWidth>
        App
      </Button>
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
      <Button size="md" variant="mint" fullWidth>
        Redis
      </Button>
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
      <Button size="md" variant="blue" fullWidth>
        DB
      </Button>
    </Grid>
  </Grid>
);
