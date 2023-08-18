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
import useMediaQuery from '@mui/material/useMediaQuery';

export default function TeacherAuth() {
  const { user, error, isLoading } = useUser();
  const { push } = useRouter();
  const md = useMediaQuery('(min-width:900px)');

  React.useEffect(() => {
    const checkUserExistence = async () => {
      const { data: response } = await a.get(`/auth/existence/${user!.email}`);
      if (!response) return;
      localStorage.setItem('user', JSON.stringify(response));
      notify('Successfully signed in!');
      push('/dashboard');
    };
    user && checkUserExistence();
  }, [user]);

  const createUser = async (type: 'students' | 'teachers') => {
    const { data: response } = await a.post(`/${type}`, {
      email: user!.email,
      firstName: user!.given_name,
      lastName: user!.family_name,
      avatar: user!.picture,
    });
    if (!response) return;
    notify('Successfully signed in!');
    push('/dashboard');
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
        height: {
          md: '100vh',
          sm: 'auto',
        },
        placeItems: 'center',
        px: {
          lg: 18,
          md: 8,
          sm: 12,
          xs: 6,
        },
        py: 4,
        backgroundImage: `url(${background.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ImageList cols={md ? 2 : 1} gap={50}>
        <ImageListItem
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={() => createUser('teachers')}
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
              <Typography variant='body2' noWrap>
                Create new classes, assignments, grades, and add students.
              </Typography>
            }
          />
        </ImageListItem>
        <ImageListItem
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={() => createUser('students')}
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
              <Typography variant='body2' noWrap>
                Join teachers' classes and view your grades.
              </Typography>
            }
          />
        </ImageListItem>
      </ImageList>
    </Box>
  );
}
