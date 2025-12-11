import { Grid, Button } from "@mui/material";

const apiUrl = import.meta.env.VITE_API_URL || "";

export const ApiButtonGrid = () => (
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
      <Button
        size="md"
        variant="pink"
        fullWidth
        component="a"
        href={`${apiUrl}/docs`}
        target="_blank"
      >
        API Docs
      </Button>
    </Grid>
  </Grid>
);
