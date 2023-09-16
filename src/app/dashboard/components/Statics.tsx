import Static from '@/src/components/Static';
import Grid from '@mui/material/Grid';

export default function Statics() {
  return (
    <Grid item xs={12} lg={4}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={6}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
      </Grid>
    </Grid>
  );
}
