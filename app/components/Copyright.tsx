import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://simplygrades.com/'>
        Simply Grades
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
