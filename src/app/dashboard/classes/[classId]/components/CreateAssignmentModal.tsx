import a from '@/src/axios';
import Modal from '@/src/components/Modal';
import { notify, passFormInputProps } from '@/src/utils';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { PolicyField } from '@prisma/client';
import React from 'react';

export default function CreateAssignmentModal({
  open,
  setOpen,
  gradingFields,
  classId,
  refetch,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  gradingFields: PolicyField[];
  classId: string;
  refetch: () => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    policyFieldId: '',
    dueDate: '',
    classId,
  });
  1;
  const handleCreateAssignment = async () => {
    setLoading(true);
    const { data: response } = await a.post('/assignments', {
      ...form,
      dueDate: new Date(form.dueDate),
    });
    if (!response) return setLoading(false);
    refetch();
    notify('Assignment created successfully!', 'success');
    setLoading(false);
  };

  const handleClose = () => !loading && setOpen(false);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title='Create assignment'
      subtitle='Create a new assignment to keep track of grades!'
      buttons={[
        {
          title: 'Cancel',
          onClick: handleClose,
        },
        {
          title: 'Create',
          onClick: async () => {
            await handleCreateAssignment();
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
        <Grid item xs={6}>
          <Autocomplete
            onChange={(_, value) => {
              value &&
                setForm((prev) => ({
                  ...prev,
                  policyFieldId: value.id,
                }));
            }}
            options={gradingFields || []}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                variant='outlined'
                label='Grading Field'
                fullWidth
                size='small'
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            label='Due Date'
            fullWidth
            size='small'
            InputLabelProps={{ shrink: true }}
            type='date'
            {...passFormInputProps('dueDate', form, setForm)}
          />
        </Grid>
      </Grid>
    </Modal>
  );
}
