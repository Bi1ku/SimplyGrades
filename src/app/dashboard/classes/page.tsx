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
import { checkUser, formatFullName, notify, passInputProps } from '@/src/utils';
import a from '@/src/axios';
import useUser from '@/src/hooks/user';
import Skeleton from '@mui/material/Skeleton';
import Exist from '@/src/components/Exist';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';

interface ClassWithTeacher extends Class {
  teacher: Teacher;
}

const subjects = [
  { label: 'Mathematics', id: 'MATHEMATICS' },
  { label: 'Science', id: 'SCIENCE' },
  { label: 'English', id: 'ENGLISH' },
  { label: 'History', id: 'HISTORY' },
  { label: 'Foreign Language', id: 'FOREIGN_LANGUAGE' },
  { label: 'Art', id: 'ART' },
  { label: 'Music', id: 'MUSIC' },
  { label: 'Health', id: 'HEALTH' },
  { label: 'Physical Education', id: 'PHYSICAL_EDUCATION' },
  { label: 'Technology', id: 'TECHNOLOGY' },
  { label: 'Engineering', id: 'ENGINEERING' },
  { label: 'Computer Science', id: 'COMPUTER_SCIENCE' },
  { label: 'Geography', id: 'GEOGRAPHY' },
  { label: 'Social Studies', id: 'SOCIAL_STUDIES' },
  { label: 'Other', id: 'OTHER' },
];

export default function Classes() {
  const user = useUser();
  const [loading, setLoading] = React.useState(true);
  const [classes, setClasses] = React.useState<ClassWithTeacher[]>([]);
  const [classId, setClassId] = React.useState('');
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    subject: '',
    period: 0,
  });
  const { push } = useRouter();

  const handleGetClasses = async (signal?: AbortSignal) => {
    const { data: response } = await a.get(`/teachers/${user.id}/classes`, {
      signal: signal,
    });
    if (!response) return;
    setClasses(response.classes);
    setLoading(false);
  };

  React.useEffect(() => {
    const controller = new AbortController();

    checkUser(user) && handleGetClasses(controller.signal);

    return () => {
      controller.abort();
    };
  }, [user]);

  const handleDeleteClass = async () => {
    const { data: response } = await a.delete(`/classes/${classId}`);
    if (!response) return;
    notify('Successfully deleted class!', 'success');
    handleGetClasses();
  };

  const handleCreateClass = async () => {
    const { data: response } = await a.post('/classes', {
      ...form,
      teacherId: user.id,
    });
    if (!response) return;
    notify('Successfully created class!', 'success');
    handleGetClasses();
  };

  return (
    <Box>
      <TabHeader setCreateModalOpen={() => setCreateModalOpen(true)} />
      <Grid container spacing={2}>
        <Exist
          data={loading}
          placeholder={new Array(9).fill(0).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant='rectangular' height={172.5} />
            </Grid>
          ))}
        >
          {classes.length &&
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
                      <Button
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setClassId(cls.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Button size='small'>Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Exist>
      </Grid>
      <Modal
        title='Delete this class?'
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        buttons={[
          { title: 'Cancel', onClick: () => setDeleteModalOpen(false) },
          { title: 'Delete', onClick: handleDeleteClass },
        ]}
      >
        <DialogContentText>
          Deleting this class will completely remove it from our database. All
          currently enrolled students, grades, etc. will be lost.
        </DialogContentText>
      </Modal>
      <Modal
        title='Create class'
        subtitle='Start a new class for your students to join!'
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
        buttons={[
          { title: 'Cancel', onClick: () => setCreateModalOpen(false) },
          { title: 'Create', onClick: handleCreateClass },
        ]}
      >
        <Grid
          container
          spacing={2}
          sx={{ width: { md: 565, sm: 500, xs: 400 }, mt: '1px' }}
        >
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='Name'
              fullWidth
              size='small'
              {...passInputProps('name', form, setForm)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(_, value) => {
                value && setForm({ ...form, subject: value.id });
              }}
              options={subjects}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Subject'
                  fullWidth
                  size='small'
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              label='Period'
              fullWidth
              type='number'
              size='small'
              InputProps={{ inputProps: { min: 0 } }}
              {...passInputProps('period', form, setForm)}
            />
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
}
