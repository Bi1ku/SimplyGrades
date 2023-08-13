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
import React, { useMemo } from 'react';
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

const defaultForm = {
  name: '',
  subject: '',
  period: 0,
};

export default function Classes() {
  const user = useUser();
  const [loading, setLoading] = React.useState({
    classes: true,
    createClass: false,
    deleteClass: false,
    editClass: false,
  });
  const [classes, setClasses] = React.useState<ClassWithTeacher[]>([]);
  const [classId, setClassId] = React.useState('');
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [createForm, setCreateForm] = React.useState(defaultForm);
  const [editForm, setEditForm] = React.useState(defaultForm);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { push } = useRouter();

  const handleGetClasses = async (signal?: AbortSignal) => {
    setLoading({ ...loading, classes: true });
    const { data: response } = await a.get(`/teachers/${user.id}/classes`, {
      signal: signal,
    });
    if (!response) return;
    setClasses(response.classes);
    setLoading({ ...loading, classes: false });
  };

  const handleDeleteClass = async () => {
    setLoading({ ...loading, deleteClass: true });
    const { data: response } = await a.delete(`/classes/${classId}`);
    if (!response) return;
    notify('Successfully deleted class!', 'success');
    await handleGetClasses();
    setLoading({ ...loading, deleteClass: false });
  };

  const handleCreateClass = async () => {
    if (!createForm.name || !createForm.subject || !createForm.period)
      return notify('Please fill out all fields!', 'error');

    setLoading({ ...loading, createClass: true });
    const { data: response } = await a.post('/classes', {
      ...createForm,
      teacherId: user.id,
    });
    if (!response) return;
    notify('Successfully created class!', 'success');
    await handleGetClasses();
    setLoading({ ...loading, createClass: false });
  };

  const handleEditClass = async () => {
    setLoading({ ...loading, editClass: true });
    const { data: response } = await a.put(`/classes/${classId}`, editForm);
    if (!response) return;
    notify('Successfully edited class!', 'success');
    await handleGetClasses();
    setLoading({ ...loading, editClass: false });
  };

  React.useEffect(() => {
    const controller = new AbortController();

    checkUser(user) && handleGetClasses(controller.signal);

    return () => controller.abort();
  }, [user]);

  useMemo(() => {
    const selectedClass = classes.find((v) => v.id === classId);
    selectedClass &&
      setEditForm({
        name: selectedClass.name,
        subject: selectedClass.subject,
        period: selectedClass.period,
      });
  }, [classId]);

  const selectedSubject = useMemo(
    () => subjects.find((v) => v.id === editForm.subject),
    [editForm.subject],
  );

  return (
    <Box>
      <TabHeader
        setCreateModalOpen={() => setCreateModalOpen(true)}
        setSearchQuery={(query: string) => setSearchQuery(query)}
      />
      <Grid container spacing={2}>
        <Exist
          data={loading.classes}
          placeholder={new Array(9).fill(0).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant='rectangular' height={172.5} />
            </Grid>
          ))}
        >
          {classes.length &&
            classes
              .filter((v) => v.name.includes(searchQuery))
              .map((cls) => (
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
                        <Typography
                          variant='h5'
                          sx={{ maxWidth: 4 / 5 }}
                          noWrap
                        >
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
                      <Button
                        onClick={() => {
                          setEditModalOpen(true);
                          setClassId(cls.id);
                        }}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Exist>
      </Grid>
      <Modal
        title='Delete this class?'
        open={deleteModalOpen}
        handleClose={() => !loading.deleteClass && setDeleteModalOpen(false)}
        buttons={[
          {
            title: 'Cancel',
            onClick: () => setDeleteModalOpen(false),
          },
          {
            title: 'Delete',
            onClick: async () => {
              await handleDeleteClass(); // Wait for class to be deleted before closing modal
              setDeleteModalOpen(false);
            },
          },
        ]}
        loading={loading.deleteClass}
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
        handleClose={() => !loading.createClass && setCreateModalOpen(false)}
        buttons={[
          {
            title: 'Cancel',
            onClick: () => setCreateModalOpen(false),
          },
          {
            title: 'Create',
            onClick: async () => {
              setCreateForm(defaultForm);
              await handleCreateClass(); // Wait for class to be created before closing modal
              setCreateModalOpen(false);
            },
          },
        ]}
        loading={loading.createClass}
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
              {...passInputProps('name', createForm, setCreateForm)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              defaultValue={subjects[subjects.length - 1]}
              onChange={(_, value) => {
                value && setCreateForm({ ...createForm, subject: value.id });
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
              {...passInputProps('period', createForm, setCreateForm)}
            />
          </Grid>
        </Grid>
      </Modal>
      <Modal
        loading={loading.editClass}
        title='Edit class'
        subtitle='Update this class with a new name, subject, or period!'
        open={editModalOpen}
        handleClose={() => !loading.editClass && setEditModalOpen(false)}
        buttons={[
          {
            title: 'Cancel',
            onClick: () => {
              setEditModalOpen(false);
            },
          },
          {
            title: 'Update',
            onClick: async () => {
              await handleEditClass();
              setEditModalOpen(false);
            },
          },
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
              {...passInputProps('name', editForm, setEditForm)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(_, value) => {
                value && setEditForm({ ...editForm, subject: value.id });
              }}
              defaultValue={selectedSubject}
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
              {...passInputProps('period', editForm, setEditForm)}
            />
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
}
