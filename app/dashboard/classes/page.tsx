'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputBase from '@mui/material/InputBase';

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
    <Box>
      <Stack flexDirection='row' sx={{ mb: 2 }}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Box
            sx={{
              padding: 2,
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder='Search…'
            sx={{
              color: 'inherit',
              '& .MuiInputBase-input': {
                padding: 1,
                paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)})`,
                transition: (theme) => theme.transitions.create('width'),
                width: { xs: '100%', sm: '30ch' },
                '&:focus': {
                  width: '34ch',
                },
              },
            }}
          />
        </Box>
        <Button
          variant='contained'
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 'auto',
          }}
        >
          <AddCircleOutlineIcon sx={{ mr: '2px' }} /> CREATE
        </Button>
      </Stack>
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
    </Box>
  );
}
