'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import TabHeader from '@/src/components/TabHeader';
import Modal from '@/src/components/Modal';
import a from '@/src/axios';
import useUser from '@/src/hooks/user';
import { checkUser, passFormInputProps } from '@/src/utils';
import { Policy, PolicyField } from '@prisma/client';
import Skeleton from '@mui/material/Skeleton';
import Exist from '@/src/components/Exist';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

interface PolicyWithFields extends Policy {
  policyFields: PolicyField[];
}

// TODO: Add functionality to policies page
export default function Policies() {
  const user = useUser();
  const [loading, setLoading] = React.useState({
    policies: true,
    createPolicy: false,
    editPolicy: false,
    deletePolicy: false,
  });
  const [modalOpen, setModalOpen] = React.useState({
    createPolicy: false,
    editPolicy: false,
    deletePolicy: false,
  });
  const [createForm, setCreateForm] = React.useState({
    name: '',
    policyFields: [{ name: '', weight: 0 }] as PolicyField[],
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [policies, setPolicies] = React.useState<PolicyWithFields[]>([]);

  const handleGetPolicies = async () => {
    setLoading((prev) => ({ ...prev, policies: true }));
    const { data: response } = await a.get(`/teachers/${user.id}/policies`);
    if (!response) return;
    setPolicies(response.policies);
    setLoading((prev) => ({ ...loading, policies: false }));
  };

  const handleCreatePolicy = async () => {};

  React.useEffect(() => {
    checkUser(user) && handleGetPolicies();
  }, [user]);

  return (
    <Box>
      <TabHeader
        setSearchQuery={setSearchQuery}
        setCreateModalOpen={() =>
          setModalOpen((prev) => ({ ...prev, createPolicy: true }))
        }
      />
      <Grid container spacing={2}>
        <Exist
          data={loading.policies}
          placeholder={new Array(9).fill(0).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant='rectangular' height={172.5} />
            </Grid>
          ))}
        >
          {policies.length &&
            policies.map((policy) => (
              <Grid item xs={12} sm={6} md={4} key={policy.id}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h5'>{policy.name}</Typography>
                    {policy.policyFields.map((section) => (
                      <Typography
                        key={section.id}
                        sx={{ mt: 1 }}
                        variant='body2'
                      >{`${section.name}: ${
                        section.weight * 100
                      }%`}</Typography>
                    ))}
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Box sx={{ ml: 'auto' }}>
                      <Button
                        onClick={() =>
                          setModalOpen((prev) => ({
                            ...prev,
                            deletePolicy: true,
                          }))
                        }
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
        title='Create grading policy'
        subtitle='Create a new grading policy for your classes!'
        open={modalOpen.createPolicy}
        handleClose={() =>
          setModalOpen((prev) => ({ ...prev, createPolicy: false }))
        }
        buttons={[
          {
            title: 'Cancel',
            onClick: () =>
              setModalOpen((prev) => ({ ...prev, createPolicy: false })),
          },
          { title: 'Create', onClick: handleCreatePolicy },
        ]}
        loading={false}
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
          {createForm.policyFields.map((field, i) => (
            <>
              <Grid item xs={5.5}>
                <TextField
                  variant='outlined'
                  label='Field Name'
                  fullWidth
                  size='small'
                  value={field.name}
                />
              </Grid>
              <Grid item xs={5.5}>
                <TextField
                  variant='outlined'
                  label='Weight'
                  fullWidth
                  type='number'
                  size='small'
                  InputProps={{ inputProps: { min: 0 } }}
                  value={field.weight}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    createForm.policyFields.splice(i, 1);
                    setCreateForm((prev) => ({ ...prev }));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </>
          ))}
          <Grid item xs={12}>
            <Button
              variant='outlined'
              startIcon={<AddIcon />}
              sx={{ borderRadius: 7 }}
              onClick={() => {
                setCreateForm((prev) => ({
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
    </Box>
  );
}
