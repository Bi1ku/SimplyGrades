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
import { Class, Policy, Teacher } from '@prisma/client';
import {
  checkUser,
  formatFullName,
  notify,
  passFormInputProps,
} from '@/src/utils';
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
  policyId: '',
};

export default function Classes() {
  const user = useUser();
  const [loading, setLoading] = React.useState({
    classes: true,
    createClass: false,
    deleteClass: false,
    editClass: false,
  });
  const [modalOpen, setModalOpen] = React.useState({
    delete: false,
    create: false,
    edit: false,
  });
  const [classes, setClasses] = React.useState<ClassWithTeacher[]>([]);
  const [selectedClass, setSelectedClass] = React.useState(classes[0]);
  const [createForm, setCreateForm] = React.useState(defaultForm);
  const [editForm, setEditForm] = React.useState(defaultForm);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [policies, setPolicies] = React.useState([] as Policy[]);
  const { push } = useRouter();

  const handleGetClasses = async () => {
    setLoading((prev) => ({ ...prev, classes: true }));
    const { data: response } = await a.get(`/teachers/${user.id}/classes`);
    if (!response) return setLoading((prev) => ({ ...prev, classes: false }));
    setClasses(response.classes);
    setLoading((prev) => ({ ...prev, classes: false }));
  };

  const handleGetPolicies = async () => {
    const { data: response } = await a.get(`/teachers/${user.id}/policies`);
    if (!response) return;
    setPolicies(
      response.policies.map((policy: Policy) => ({
        label: policy.name,
        id: policy.id,
      })),
    );
  };

  const handleDeleteClass = async () => {
    setLoading((prev) => ({ ...prev, deleteClass: true }));
    const { data: response } = await a.delete(`/classes/${selectedClass.id}`);
    if (!response)
      return setLoading((prev) => ({ ...prev, deleteClass: false }));
    notify('Successfully deleted class!');
    await handleGetClasses();
    setLoading((prev) => ({ ...prev, deleteClass: false }));
  };

  const handleCreateClass = async () => {
    console.log(createForm);

    if (
      !createForm.name ||
      !createForm.subject ||
      !createForm.period ||
      !createForm.policyId
    )
      return notify('Please fill out all fields!', 'error');

    setLoading((prev) => ({ ...prev, createClass: true }));
    const { data: response } = await a.post('/classes', {
      ...createForm,
      teacherId: user.id,
    });
    if (!response)
      return setLoading((prev) => ({ ...prev, createClass: false }));
    notify('Successfully created class!');
    await handleGetClasses();
    setLoading((prev) => ({ ...prev, createClass: false }));
  };

  const handleEditClass = async () => {
    setLoading((prev) => ({ ...prev, editClass: true }));
    const { data: response } = await a.put(
      `/classes/${selectedClass.id}`,
      editForm,
    );
    if (!response) return setLoading((prev) => ({ ...prev, editClass: false }));
    notify('Successfully edited class!');
    await handleGetClasses();
    setLoading((prev) => ({ ...prev, editClass: false }));
  };

  React.useEffect(() => {
    if (checkUser(user)) {
      handleGetPolicies();
      handleGetClasses();
    }
  }, [user]);

  React.useEffect(() => {
    selectedClass &&
      setEditForm({
        name: selectedClass.name,
        subject: selectedClass.subject,
        period: selectedClass.period,
        policyId: selectedClass.policyId,
      });
  }, [selectedClass]);

  const selectedSubject = useMemo(
    () => subjects.find((v) => v.id === editForm.subject),
    [editForm.subject],
  );

  return (
    <Box>
      <TabHeader
        setCreateModalOpen={() => {
          setCreateForm(defaultForm);
          setModalOpen((prev) => ({ ...prev, create: true }));
        }}
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
                            setModalOpen((prev) => ({ ...prev, delete: true }));
                            setSelectedClass(cls);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                      <Button
                        onClick={() => {
                          setModalOpen((prev) => ({ ...prev, edit: true }));
                          setSelectedClass(cls);
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
        open={modalOpen.delete}
        handleClose={() =>
          !loading.deleteClass &&
          setModalOpen((prev) => ({ ...prev, delete: false }))
        }
        buttons={[
          {
            title: 'Cancel',
            onClick: () =>
              !loading.deleteClass &&
              setModalOpen((prev) => ({
                ...prev,
                delete: false,
              })),
          },
          {
            title: 'Delete',
            onClick: async () => {
              await handleDeleteClass(); // Wait for class to be deleted before closing modal
              setModalOpen((prev) => ({ ...prev, delete: false }));
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
        open={modalOpen.create}
        handleClose={() =>
          !loading.createClass &&
          setModalOpen((prev) => ({ ...prev, create: false }))
        }
        buttons={[
          {
            title: 'Cancel',
            onClick: () =>
              !loading.createClass &&
              setModalOpen((prev) => ({
                ...prev,
                create: false,
              })),
          },
          {
            title: 'Create',
            onClick: async () => {
              await handleCreateClass(); // Wait for class to be created before closing modal
              setModalOpen((prev) => ({ ...prev, create: false }));
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
              {...passFormInputProps('name', createForm, setCreateForm)}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              onChange={(_, value) => {
                value &&
                  setCreateForm((prev) => ({ ...prev, policyId: value.id }));
              }}
              options={policies}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Grading Policy'
                  fullWidth
                  size='small'
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(_, value) => {
                value &&
                  setCreateForm((prev) => ({ ...prev, subject: value.id }));
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
              {...passFormInputProps('period', createForm, setCreateForm)}
            />
          </Grid>
        </Grid>
      </Modal>
      <Modal
        loading={loading.editClass}
        title='Edit class'
        subtitle='Update this class with a new name, subject, or period!'
        open={modalOpen.edit}
        handleClose={() =>
          !loading.editClass &&
          setModalOpen((prev) => ({ ...prev, edit: false }))
        }
        buttons={[
          {
            title: 'Cancel',
            onClick: () =>
              !loading.editClass &&
              setModalOpen((prev) => ({
                ...prev,
                edit: false,
              })),
          },
          {
            title: 'Update',
            onClick: async () => {
              await handleEditClass();
              setModalOpen((prev) => ({ ...prev, edit: false }));
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
              {...passFormInputProps('name', editForm, setEditForm)}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(_, value) => {
                value &&
                  setEditForm((prev) => ({ ...prev, subject: value.id }));
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
              {...passFormInputProps('period', editForm, setEditForm)}
            />
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
}
