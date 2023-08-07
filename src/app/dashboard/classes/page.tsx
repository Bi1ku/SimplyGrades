'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import DialogContentText from '@mui/material/DialogContentText';
import React from 'react';
import Modal from '@/src/components/Modal';
import TabHeader from '@/src/components/TabHeader';
import { Class, Teacher } from '@prisma/client';
import { checkUser, formatFullName } from '@/src/utils';
import a from '@/src/axios';
import useUser from '@/src/hooks/user';
import Skeleton from '@mui/material/Skeleton';

interface ClassWithTeacher extends Class {
  teacher: Teacher;
}

export default function Classes() {
  const user = useUser();
  const [loading, setLoading] = React.useState(true);
  const [classes, setClasses] = React.useState<ClassWithTeacher[]>([]);
  const [open, setOpen] = React.useState(false);
  const { push } = useRouter();

  React.useEffect(() => {
    const controller = new AbortController();

    const handleGetClasses = async (signal: AbortSignal) => {
      const { data: response } = await a.get(`/teachers/${user.id}/classes`, {
        signal: signal,
      });
      if (!response) return;
      setClasses(response.classes);
      setLoading(false);
    };

    checkUser(user) && handleGetClasses(controller.signal);

    return () => {
      controller.abort();
    };
  }, [user]);

  return (
    <Box>
      <TabHeader />
      <Grid container spacing={2}>
        {loading ? (
          new Array(9).fill(0).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant='rectangular' height={172.5} />
            </Grid>
          ))
        ) : classes.length ? (
          classes.map((cls) => (
            <Grid item xs={12} sm={6} md={4} key={cls.id}>
              <Card variant='outlined'>
                <CardContent
                  onClick={() => push(`/dashboard/classes/${cls.id}`)}
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography variant='h5' sx={{ maxWidth: 4 / 5 }} noWrap>
                      {cls.name}
                    </Typography>
                    <Typography variant='caption'>{`Period ${cls.period}`}</Typography>
                  </Box>
                  <Typography variant='subtitle2'>{cls.subject}</Typography>
                  <Typography variant='subtitle1' sx={{ mt: 1 }}>
                    {formatFullName(user)}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Box sx={{ ml: 'auto' }}>
                    <Button onClick={() => setOpen(true)}>Delete</Button>
                  </Box>
                  <Button size='small'>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
      <Modal
        title='Delete this class?'
        open={open}
        handleClose={() => setOpen(false)}
        buttons={[
          { title: 'Cancel', onClick: () => setOpen(false) },
          { title: 'Delete', onClick: () => setOpen(false) },
        ]}
      >
        <DialogContentText>
          Deleting this class will completely remove it from our database. All
          currently enrolled students, grades, etc. will be lost.
        </DialogContentText>
      </Modal>
    </Box>
  );
}
