import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Static({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Paper variant='outlined' sx={{ p: 2 }}>
      <Typography
        variant='body2'
        sx={{
          fontWeight: 500,
          color: (theme) => theme.palette.grey[600],
          letterSpacing: 0.4,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant='h5'
        sx={{
          fontWeight: 600,
          mt: '10px',
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
}
