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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import React from 'react';

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                width: { xs: '18ch', sm: '30ch' },
                '&:focus': {
                  sm: {
                    width: '34ch',
                  },
                  xs: {
                    width: '22ch',
                  },
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
                <Box sx={{ ml: 'auto' }}>
                  <Button onClick={handleClickOpen}>Delete</Button>
                </Box>
                <Button size='small'>Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* TODO: Add this dialog in a separate modal component */}
      <Dialog open={open} onClose={handleClose} sx={{ boxShadow: 'none' }}>
        <DialogTitle>Delete this class?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this class will completely remove it from our database. All
            currently enrolled students, grades, etc. will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
