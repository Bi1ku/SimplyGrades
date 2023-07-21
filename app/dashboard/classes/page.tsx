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
import Modal from '@/app/components/Modal';
import TabHeader from '@/app/components/TabHeader';

const classes = [
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c675',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c676',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c678',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c679',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c6710',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c6711',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c6712',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c6713',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c6714',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
  {
    id: 'c451bd0d-0327-46c6-adfc-42f57514c6715',
    title: 'Honors Pre-Calculus',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    room: 'A-1',
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    period: '1',
  },
];

export default function Classes() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Box>
      <TabHeader />
      <Grid container spacing={2}>
        {classes.map((cls) => (
          <Grid item xs={12} sm={6} md={4} key={cls.id}>
            <Card variant='outlined'>
              <CardContent
                onClick={() => router.push(`/dashboard/classes/${cls.id}`)}
                sx={{ '&:hover': { cursor: 'pointer' } }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='h5'>{cls.title}</Typography>
                  <Typography variant='caption'>{`Period ${cls.period}`}</Typography>
                </Box>
                <Typography variant='subtitle2'>{cls.subject}</Typography>
                <Typography variant='subtitle1' sx={{ mt: 1 }}>
                  {cls.teacher}
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
        ))}
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
