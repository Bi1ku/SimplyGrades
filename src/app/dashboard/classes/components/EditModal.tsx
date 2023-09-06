import Modal from '@/src/components/Modal';
import { notify, passFormInputProps } from '@/src/utils';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import React from 'react';
import a from '@/src/axios';
import { defaultForm as defaultForm2, subjects } from './CreateModal';
import { ClassWithTeacher } from '../page';

export default function EditModal({
  open,
  setOpen,
  refetch,
  cls,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
  cls: ClassWithTeacher;
}) {
  const defaultForm = cls
    ? {
        name: cls.name,
        subject: cls.subject,
        period: cls.period,
        policyId: cls.policyId,
      }
    : defaultForm2;

  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState(defaultForm);

  const handleEditClass = async () => {
    setLoading(true);
    const { data: response } = await a.put(`/classes/${cls.id}`, form);
    if (!response) return setLoading(false);
    notify('Successfully edited class!');
    refetch();
    setLoading(false);
  };

  const handleClose = () => !loading && setOpen(false);

  const subject = React.useMemo(
    () => subjects.find((v) => v.id === form.subject),
    [form.subject],
  );
  return (
    <Modal
      loading={loading}
      title='Edit class'
      subtitle='Update this class with a new name, subject, or period!'
      open={open}
      handleClose={handleClose}
      buttons={[
        {
          title: 'Cancel',
          onClick: handleClose,
        },
        {
          title: 'Update',
          onClick: async () => {
            await handleEditClass();
            handleClose();
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
            {...passFormInputProps('name', form, setForm)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            onChange={(_, value: any) => {
              value && setForm((prev) => ({ ...prev, subject: value.id }));
            }}
            defaultValue={subject}
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
