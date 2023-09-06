import Modal from '@/src/components/Modal';
import { notify, passFormInputProps } from '@/src/utils';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import React from 'react';
import useUser from '@/src/hooks/user';
import a from '@/src/axios';
import { Policy } from '@prisma/client';

export const defaultForm = {
  name: '',
  subject: '',
  period: 0,
  policyId: '',
};

export const subjects = [
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

export default function DeleteModal({
  open,
  setOpen,
  refetch,
  policies,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
  policies: Policy[];
}) {
  const user = useUser();
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState(defaultForm);

  const handleCreateClass = async () => {
    if (!form.name || !form.subject || !form.period || !form.policyId)
      return notify('Please fill out all fields!', 'error');

    setLoading(true);
    const { data: response } = await a.post('/classes', {
      ...form,
      teacherId: user.id,
    });
    if (!response) return setLoading(false);
    notify('Successfully created class!');
    refetch();
    setLoading(false);
  };

  const handleClose = () => {
    if (!loading) {
      setForm(defaultForm);
      setOpen(false);
    }
  };
  return (
    <Modal
      title='Create class'
      subtitle='Start a new class for your students to join!'
      open={open}
      handleClose={handleClose}
      buttons={[
        {
          title: 'Cancel',
          onClick: handleClose,
        },
        {
          title: 'Create',
          onClick: async () => {
            await handleCreateClass();
            handleClose();
          },
        },
      ]}
      loading={loading}
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
            {...passFormInputProps('name', form, setForm)}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            onChange={(_, value) => {
              value && setForm((prev) => ({ ...prev, policyId: value.id }));
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
              value && setForm((prev) => ({ ...prev, subject: value.id }));
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
            {...passFormInputProps('period', form, setForm)}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
