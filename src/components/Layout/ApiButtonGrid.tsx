import { Grid, Button } from "@mui/material";

export const ApiButtonGrid = () => (
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
      <Button size="md" variant="pink" fullWidth>
        API Docs
      </Button>
    </Grid>
  </Grid>
);
