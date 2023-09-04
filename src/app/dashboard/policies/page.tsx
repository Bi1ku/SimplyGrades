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
import { checkUser, notify, passFormInputProps } from '@/src/utils';
import { Class, Policy, PolicyField } from '@prisma/client';
import Skeleton from '@mui/material/Skeleton';
import Exist from '@/src/components/Exist';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogContentText, IconButton, Stack, useTheme } from '@mui/material';

interface PolicyWithIncludes extends Policy {
  policyFields: PolicyField[];
  classes: Class[];
}

const defaultForm = {
  name: '',
  policyFields: [{ name: '', weight: 0 }] as PolicyField[],
};

const colors = [
  '#ACDDDE',
  '#CAF1DE',
  '#E1F8DC',
  '#FEF8DD',
  '#FFE7C7',
  '#F7D8BA',
];

const ClassesPills = React.memo(
  ({ policy }: { policy: PolicyWithIncludes }) => {
    return policy.classes.map((cls) => (
      <Box
        key={cls.id}
        sx={{
          bgcolor: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: 500,
          px: 1,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Typography
          variant='caption'
          sx={{
            color: (theme) => theme.palette.grey[600],
          }}
        >
          {cls.name}
        </Typography>
      </Box>
    ));
  },
);

export default function Policies() {
  const user = useUser();

  const [loading, setLoading] = React.useState({
    policies: true,
    createPolicy: false,
    deletePolicy: false,
    editPolicy: false,
  });
  const [modalOpen, setModalOpen] = React.useState({
    createPolicy: false,
    deletePolicy: false,
    editPolicy: false,
  });
  const [createForm, setCreateForm] = React.useState(defaultForm);
  const [editForm, setEditForm] = React.useState(defaultForm);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [policies, setPolicies] = React.useState<PolicyWithIncludes[]>([]);
  const [selectedPolicy, setSelectedPolicy] = React.useState(policies[0]);

  const handleGetPolicies = async () => {
    setLoading((prev) => ({ ...prev, policies: true }));
    const { data: response } = await a.get(`/teachers/${user.id}/policies`);
    if (!response) return setLoading((prev) => ({ ...prev, policies: false }));
    setPolicies(response.policies);
    setLoading((prev) => ({ ...prev, policies: false }));
  };

  const handleCreatePolicy = async () => {
    setLoading((prev) => ({ ...prev, createPolicy: true }));
    const { data: response } = await a.post('/policies', {
      ...createForm,
      teacherId: user.id,
    });
    if (!response)
      return setLoading((prev) => ({ ...prev, createPolicy: false }));
    notify('Successfully created policy!');
    handleGetPolicies();
    setLoading((prev) => ({ ...prev, createPolicy: false }));
  };

  const handleDeletePolicy = async () => {
    setLoading((prev) => ({ ...prev, deletePolicy: true }));
    const { data: response } = await a.delete(`/policies/${selectedPolicy.id}`);
    if (!response)
      return setLoading((prev) => ({ ...prev, deletePolicy: false }));
    notify('Successfully deleted policy!');
    handleGetPolicies();
    setLoading((prev) => ({ ...prev, deletePolicy: false }));
  };

  const handleEditPolicy = async () => {
    if (editForm.policyFields.reduce((a, b) => a + b['weight'], 0) !== 1)
      return notify('Weights must add up to 100%!', 'error');

    setLoading((prev) => ({ ...prev, editPolicy: true }));
    const { data: response } = await a.put(
      `/policies/${selectedPolicy.id}`,
      editForm,
    );
    if (!response)
      return setLoading((prev) => ({ ...prev, editPolicy: false }));
    notify('Successfully updated policy!');
    handleGetPolicies();
    setLoading((prev) => ({ ...prev, editPolicy: false }));
  };

  React.useEffect(() => {
    checkUser(user) && handleGetPolicies();
  }, [user]);

  React.useEffect(() => {
    selectedPolicy &&
      setEditForm({
        name: selectedPolicy.name,
        policyFields: selectedPolicy.policyFields.map((field) => ({
          ...field,
        })),
      });
  }, [selectedPolicy]);

  return (
    <Box>
      <TabHeader
        setSearchQuery={setSearchQuery}
        setCreateModalOpen={() => {
          setCreateForm(defaultForm);
          setModalOpen((prev) => ({ ...prev, createPolicy: true }));
        }}
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
            policies
              .filter((policy) => policy.name.includes(searchQuery))
              .map((policy) => (
                <Grid item xs={12} sm={6} md={4} key={policy.id}>
                  <Card variant='outlined' sx={{ height: '100%' }}>
                    <Stack
                      justifyContent='space-between'
                      sx={{ height: '100%' }}
                    >
                      <CardContent>
                        <Typography variant='h5'>{policy.name}</Typography>
                        {policy.policyFields.map((field) => (
                          <Typography
                            key={field.id}
                            sx={{ mt: 1 }}
                            variant='body2'
                          >{`${field.name}: ${
                            field.weight * 100
                          }%`}</Typography>
                        ))}
                        <Stack
                          flexWrap='wrap'
                          flexDirection='row'
                          gap={1}
                          sx={{ mt: 2 }}
                        >
                          <ClassesPills policy={policy} />
                        </Stack>
                      </CardContent>
                      <Box>
                        <Divider />
                        <CardActions>
                          <Box sx={{ ml: 'auto' }}>
                            <Button
                              onClick={() => {
                                setSelectedPolicy(policy);
                                setModalOpen((prev) => ({
                                  ...prev,
                                  deletePolicy: true,
                                }));
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedPolicy(policy);
                                setModalOpen((prev) => ({
                                  ...prev,
                                  editPolicy: true,
                                }));
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                        </CardActions>
                      </Box>
                    </Stack>
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
          !loading.createPolicy &&
          setModalOpen((prev) => ({ ...prev, createPolicy: false }))
        }
        buttons={[
          {
            title: 'Cancel',
            onClick: () =>
              !loading.createPolicy &&
              setModalOpen((prev) => ({ ...prev, createPolicy: false })),
          },
          {
            title: 'Create',
            onClick: async () => {
              await handleCreatePolicy();
              setModalOpen((prev) => ({ ...prev, createPolicy: false }));
            },
          },
        ]}
        loading={loading.createPolicy}
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
                    setCreateForm((prev) => ({ ...prev }));
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
                    setCreateForm((prev) => ({ ...prev }));
                  }}
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
            </React.Fragment>
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
      <Modal
        title='Delete this policy?'
        open={modalOpen.deletePolicy}
        handleClose={() =>
          !loading.deletePolicy &&
          setModalOpen((prev) => ({ ...prev, deletePolicy: false }))
        }
        buttons={[
          {
            title: 'Cancel',
            onClick: () =>
              !loading.deletePolicy &&
              setModalOpen((prev) => ({
                ...prev,
                deletePolicy: false,
              })),
          },
          {
            title: 'Delete',
            onClick: async () => {
              await handleDeletePolicy();
              setModalOpen((prev) => ({ ...prev, deletePolicy: false }));
            },
          },
        ]}
        loading={loading.deletePolicy}
      >
        <DialogContentText>
          Deleting this class will completely remove it from our database. All
          future classes will not be able to use this policy again.
        </DialogContentText>
      </Modal>
      <Modal
        title='Edit grading policy'
        subtitle='Update this grading policy for your classes!'
        open={modalOpen.editPolicy}
        handleClose={() =>
          setModalOpen((prev) => ({ ...prev, editPolicy: false }))
        }
        buttons={[
          {
            title: 'Cancel',
            onClick: () =>
              setModalOpen((prev) => ({ ...prev, editPolicy: false })),
          },
          {
            title: 'Update',
            onClick: async () => {
              await handleEditPolicy();
              setModalOpen((prev) => ({ ...prev, editPolicy: false }));
            },
          },
        ]}
        loading={loading.editPolicy}
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
          {editForm.policyFields.map((field) => (
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
                    setEditForm((prev) => ({ ...prev }));
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
                    setEditForm((prev) => ({ ...prev }));
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
                setEditForm((prev) => ({
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
