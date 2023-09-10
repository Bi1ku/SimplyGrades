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
import React from 'react';
import TabHeader from '@/src/components/TabHeader';
import { Class, Policy, Teacher } from '@prisma/client';
import { checkUser, formatFullName } from '@/src/utils';
import a from '@/src/axios';
import useUser from '@/src/hooks/user';
import Skeleton from '@mui/material/Skeleton';
import Exist from '@/src/components/Exist';
import DeleteModal from './components/DeleteModal';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';

export interface ClassWithTeacher extends Class {
  teacher: Teacher;
}

export default function Classes() {
  const user = useUser();
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState({
    delete: false,
    create: false,
    edit: false,
  });
  const [classes, setClasses] = React.useState<ClassWithTeacher[]>([]);
  const [cls, setClass] = React.useState(classes[0]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [policies, setPolicies] = React.useState([] as Policy[]);
  const { push } = useRouter();

  const handleGetClasses = React.useCallback(async () => {
    setLoading(true);
    const { data: response } = await a.get(`/teachers/${user.id}/classes`);
    if (!response) return setLoading(false);
    setClasses(response.classes);
    setLoading(false);
  }, [user.id]);

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

  const handleSetModal = React.useCallback(
    (modal: keyof typeof modalOpen) => (value: boolean) =>
      setModalOpen((prev) => ({ ...prev, [modal]: value })),
    [],
  );

  React.useEffect(() => {
    if (checkUser(user)) {
      handleGetPolicies();
      handleGetClasses();
    }
  }, [user]);

  return (
    <Box>
      <TabHeader
        setCreateModalOpen={() => handleSetModal('create')(true)}
        setSearchQuery={(query: string) => setSearchQuery(query)}
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
                            handleSetModal('delete')(true);
                            setClass(cls);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                      <Button
                        onClick={() => {
                          handleSetModal('edit')(true);
                          setClass(cls);
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
      <DeleteModal
        open={modalOpen.delete}
        setOpen={handleSetModal('delete')}
        refetch={handleGetClasses}
        classId={cls?.id || ''}
      />
      <CreateModal
        open={modalOpen.create}
        setOpen={handleSetModal('create')}
        refetch={handleGetClasses}
        policies={policies}
      />
      <EditModal
        open={modalOpen.edit}
        setOpen={handleSetModal('edit')}
        refetch={handleGetClasses}
        cls={cls}
      />
    </Box>
  );
}
