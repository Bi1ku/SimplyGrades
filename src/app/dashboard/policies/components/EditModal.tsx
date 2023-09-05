import { notify, passFormInputProps } from '@/src/utils';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@/src/components/Modal';
import { PolicyField } from '@prisma/client';
import React from 'react';
import a from '@/src/axios';
import AddIcon from '@mui/icons-material/Add';
import { PolicyWithIncludes } from '../page';

export default function EditModal({
  open,
  setOpen,
  refetch,
  policy,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
  policy: PolicyWithIncludes;
}) {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: '',
    policyFields: policy
      ? policy.policyFields.map((field) => ({
          ...field,
        }))
      : [],
  });

  const handleEditPolicy = async () => {
    if (form.policyFields.reduce((a, b) => a + b['weight'], 0) !== 1)
      return notify('Weights must add up to 100%!', 'error');

    setLoading(true);
    const { data: response } = await a.put(`/policies/${policy.id}`, form);
    if (!response) setLoading(false);
    notify('Successfully updated policy!');
    refetch();
    setLoading(false);
  };

  const handleClose = () => !loading && setOpen(false);
  return (
    <Modal
      title='Edit grading policy'
      subtitle='Update this grading policy for your classes!'
      open={open}
      handleClose={handleClose}
      buttons={[
        {
          title: 'Cancel',
          onClick: () => handleClose,
        },
        {
          title: 'Update',
          onClick: async () => {
            await handleEditPolicy();
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
        {form.policyFields.map((field) => (
          <React.Fragment key={field.id}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
