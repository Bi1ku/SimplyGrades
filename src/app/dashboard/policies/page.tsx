'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import TabHeader from '@/src/components/TabHeader';
import a from '@/src/axios';
import useUser from '@/src/hooks/user';
import { checkUser } from '@/src/utils';
import { Class, Policy, PolicyField } from '@prisma/client';
import CreateModal from './components/CreateModal';
import Exist from '@/src/components/Exist';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';

export interface PolicyWithIncludes extends Policy {
  policyFields: PolicyField[];
  classes: Class[];
}

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
  const [modalOpen, setModalOpen] = React.useState({
    createPolicy: false,
    deletePolicy: false,
    editPolicy: false,
  });
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [policies, setPolicies] = React.useState<PolicyWithIncludes[]>([]);
  const [policy, setPolicy] = React.useState(policies[0]);

  const handleGetPolicies = React.useCallback(async () => {
    setLoading(true);
    const { data: response } = await a.get(`/teachers/${user.id}/policies`);
    if (!response) return setLoading(false);
    setPolicies(response.policies);
    setLoading(false);
  }, [user.id]);

  const handleSetModal = React.useCallback(
    (modal: keyof typeof modalOpen) => (value: boolean) =>
      setModalOpen((prev) => ({ ...prev, [modal]: value })),
    [],
  );

  React.useEffect(() => {
    checkUser(user) && handleGetPolicies();
  }, [user]);

  return (
    <Box>
      <TabHeader
        setSearchQuery={setSearchQuery}
        setCreateModalOpen={() => handleSetModal('createPolicy')(true)}
      />
      <Grid container spacing={2}>
        <Exist
          data={loading}
          placeholder={new Array(9).fill(0).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant='rectangular' height={172.5} />
            </Grid>
          ))}
        >
          {policies.length
            ? policies
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
                                  setPolicy(policy);
                                  handleSetModal('deletePolicy')(true);
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                onClick={() => {
                                  setPolicy(policy);
                                  handleSetModal('editPolicy')(true);
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
                ))
            : null}
        </Exist>
      </Grid>
      <DeleteModal
        open={modalOpen.deletePolicy}
        setOpen={handleSetModal('deletePolicy')}
        refetch={handleGetPolicies}
        policyId={policy?.id || ''}
      />
      <EditModal
        open={modalOpen.editPolicy}
        setOpen={handleSetModal('editPolicy')}
        refetch={handleGetPolicies}
        policy={policy}
      />
      <CreateModal
        open={modalOpen.createPolicy}
        setOpen={handleSetModal('createPolicy')}
        refetch={handleGetPolicies}
      />
    </Box>
  );
}
