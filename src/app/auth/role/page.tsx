'use client';

import a from '@/src/axios';
import { notify } from '@/src/utils';
import { useUser } from '@auth0/nextjs-auth0/client';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import React from 'react';
import background from '../../../../public/images/auth_background.png';
import { useRouter } from 'next/navigation';

export default function TeacherAuth() {
  const { user, error, isLoading } = useUser();
  const { push } = useRouter();

  const authorizeTeacher = async () => {
    if (user) {
      const response = await a.post('/teacher', {
        email: user.email,
        firstName: user.given_name,
        lastName: user.family_name,
      });

      if (response) {
        notify('Successfully signed in!');
        push('/dashboard');
      }
    }
  };

  const authorizeStudent = async () => {
    if (user) {
      const response = await a.post('/student', {
        email: user.email,
        firstName: user.given_name,
        lastName: user.family_name,
      });

      if (response) {
        notify('Successfully signed in!');
        push('/dashboard');
      }
    }
  };

  if (isLoading)
    return (
      <Box sx={{ display: 'grid', height: '100vh', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  else if (error) {
    notify('Something went wrong.', 'error');
    return (
      <Box sx={{ display: 'grid', height: '100vh', placeItems: 'center' }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Something went wrong.
          </Typography>
          <Typography variant='body2' sx={{ mb: 2 }}>
            {error.message}
          </Typography>
          <Typography variant='body2'>
            Please try again or contact support.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        height: '100vh',
        placeItems: 'center',
        px: 18,
        py: 2,
        backgroundImage: `url(${background.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ImageList cols={2} gap={50}>
        <ImageListItem
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={authorizeTeacher}
        >
          <img src='/images/teacher.jpg' style={{ borderRadius: 25 }} />
          <ImageListItemBar
            sx={{ p: 2, mb: 3 }}
            title={
              <Typography variant='h6' sx={{ letterSpacing: 1 }}>
                Teacher
              </Typography>
            }
            subtitle={
              <Typography variant='body2'>
                Create new classes, assignments, grades, and add students.
              </Typography>
            }
          />
        </ImageListItem>
        <ImageListItem
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={authorizeStudent}
        >
          <img src='/images/student.jpg' style={{ borderRadius: 25 }} />
          <ImageListItemBar
            sx={{ p: 2, mb: 3 }}
            title={
              <Typography variant='h6' sx={{ letterSpacing: 1 }}>
                Student
              </Typography>
            }
            subtitle={
              <Typography variant='body2'>
                Join teachers' classes and view your grades.
              </Typography>
            }
          />
        </ImageListItem>
      </ImageList>
    </Box>
  );
}
