import a from '@/src/axios';
import Modal from '@/src/components/Modal';
import useUser from '@/src/hooks/user';
import { notify, passFormInputProps } from '@/src/utils';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { PolicyField } from '@prisma/client';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const defaultForm = {
  name: '',
  policyFields: [] as PolicyField[],
};

export default function CreateModal({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
}) {
  const user = useUser();
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState(defaultForm);

  const handleClose = () => {
    if (!loading) {
      setForm(defaultForm);
      setOpen(false);
    }
  };

  const handleCreatePolicy = async () => {
    setLoading(true);
    const { data: response } = await a.post('/policies', {
      ...form,
      teacherId: user.id,
    });
    if (!response) return setLoading(false);
    notify('Successfully created policy!');
    refetch();
    setLoading(false);
  };

  return (
    <Modal
      title='Create grading policy'
      subtitle='Create a new grading policy for your classes!'
      open={open}
      handleClose={handleClose}
      buttons={[
        { title: 'Cancel', onClick: handleClose },
        {
          title: 'Create',
          onClick: async () => {
            await handleCreatePolicy();
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
        {form.policyFields.map((field, i) => (
          <React.Fragment key={field.id}>
            <Grid item xs={5.5}>
              <TextField
                variant='outlined'
                label='Field Name'
                fullWidth
                size='small'
                value={field.name}
                onChange={(e) => {
                  field.name = e.target.value;
                  setForm((prev) => ({ ...prev }));
                }}
              />
            </Grid>
            <Grid item xs={5.5}>
              <TextField
                variant='outlined'
                label='Weight'
                fullWidth
                type='number'
                size='small'
                InputProps={{ inputProps: { min: 0, max: 1 } }}
                value={field.weight}
                onChange={(e) => {
                  field.weight = +e.target.value;
                  setForm((prev) => ({ ...prev }));
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  form.policyFields.splice(i, 1);
                  setForm((prev) => ({ ...prev }));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            sx={{ borderRadius: 7 }}
            onClick={() => {
              setForm((prev) => ({
                ...prev,
                policyFields: [
                  ...prev.policyFields,
                  { name: '', weight: 0 } as PolicyField,
                ],
              }));
            }}
          >
            New Field
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}
