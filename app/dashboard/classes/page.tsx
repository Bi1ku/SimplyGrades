'use client';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const classes = [
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 1,
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
];

export default function SignIn() {
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      {classes.map((v) => (
        <Grid item xs={12} sm={6} md={4} key={v.id}>
          <Card>
            <CardContent
              onClick={() => router.push(`/dashboard/classes/${v.id}`)}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h5'>{v.title}</Typography>
                <Typography variant='caption'>{`Period ${v.period}`}</Typography>
              </Box>
              <Typography variant='subtitle2'>{v.subject}</Typography>
              <Typography variant='subtitle1' sx={{ mt: 1 }}>
                {v.teacher}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button size='small' sx={{ ml: 'auto' }}>
                Delete
              </Button>
              <Button size='small'>Edit</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
