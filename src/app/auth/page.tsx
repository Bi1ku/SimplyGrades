'use client';

import a from '@/src/axios';
import { notify } from '@/src/utils';
import { useUser } from '@auth0/nextjs-auth0/client';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export default function Auth() {
  const { user, error, isLoading } = useUser();

  React.useEffect(() => {
    const signIn = async () => {
      if (user) {
        const response = await a.post('/teacher', {
          email: user.email,
          firstName: user.given_name,
          lastName: user.family_name,
        });

        if (response) notify('Successfully signed in!');
      }
    };
    signIn();
  }, [user]);

  React.useEffect(() => notify('Something went wrong.'), [error]);

  // TODO: Create a full loading screen component
  if (isLoading) return <CircularProgress />;
}
