import Static from "@/src/components/Static";
import Grid from "@mui/material/Grid";

export default function StaticData() {
  return (
    <>
      <Grid item xs={6} md={3}>
        <Static title="Average Student Grade" description="98%" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Static title="Average Student Grade" description="98%" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Static title="Average Student Grade" description="98%" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Static title="Average Student Grade" description="98%" />
      </Grid>
    </>
  );
}
