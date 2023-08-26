'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Add from '@mui/icons-material/Add';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts';
import dynamic from 'next/dynamic';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import Static from '@/src/components/Static';
import { useRouter } from 'next/navigation';
import PanelCard from '@/src/components/PanelCard';
import SearchBar from '@/src/components/SearchBar';
import a from '@/src/axios';
import { formatFullName, notify, passFormInputProps } from '@/src/utils';
import { useDebounce } from 'use-debounce';
import CircularProgress from '@mui/material/CircularProgress';
import Exist from '@/src/components/Exist';
import Modal from '@/src/components/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import { Class, Policy, PolicyField } from '@prisma/client';

interface PolicyWithIncludes extends Policy {
  policyFields: PolicyField[];
}

interface ClassWithIncludes extends Class {
  policy: PolicyWithIncludes;
}

const AreaChart = dynamic(
  () => import('recharts').then((recharts) => recharts.AreaChart),
  { ssr: false },
);

const Table = dynamic(() => import('@/src/components/Table'), { ssr: false });

const data = [
  {
    name: 'Assignment 1',
    avgGrade: 78,
    studentGrade: 90,
  },
  {
    name: 'Assignment 2',
    avgGrade: 45,
    studentGrade: 87,
  },
  {
    name: 'Assignment 3',
    avgGrade: 90,
    studentGrade: 72,
  },
  {
    name: 'Assignment 4',
    avgGrade: 80,
    studentGrade: 50,
  },
  {
    name: 'Assignment 5',
    avgGrade: 47,
    studentGrade: 100,
  },
  {
    name: 'Assignment 6',
    avgGrade: 93,
    studentGrade: 78,
  },
  {
    name: 'Assignment 7',
    avgGrade: 78,
    studentGrade: 34,
  },
];

const emptyTable = {
  data: [] as any[],
  count: 0,
  page: 0,
};

export default function ClassDetail({
  params,
}: {
  params: { classId: string };
}) {
  const { classId } = params;
  const [age, setAge] = React.useState('');
  const [loading, setLoading] = React.useState({
    tableData: true,
    students: false,
    assignments: false,
    createAssignment: false,
  });
  const [studentsTable, setStudentsTable] = React.useState(emptyTable);
  const [assignmentsTable, setAssignmentsTable] = React.useState(emptyTable);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [createAssignmentForm, setCreateAssignmentForm] = React.useState({
    name: '',
    policyFieldId: '',
    dueDate: '',
    classId,
  });
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [assignmentModalOpen, setAssignmentModalOpen] = React.useState(false);
  const [gradingModalOpen, setGradingModalOpen] = React.useState(false);
  const [cls, setClass] = React.useState<ClassWithIncludes>();
  const gradingFields = React.useMemo(() => {
    if (cls)
      return cls.policy.policyFields.map((field) => ({
        id: field.id,
        label: field.name,
      }));
  }, [cls]);

  const handleGetClass = async () => {
    const { data: response } = await a.get(`/classes/${classId}`);
    if (!response) return;
    setClass(response);
  };

  const handleGetStudents = async (page: number = 0) => {
    setLoading((prev) => ({ ...prev, students: true }));
    const { data: response } = await a.get(`/classes/${classId}/students`, {
      params: { page },
    });
    if (!response) return setLoading((prev) => ({ ...prev, students: false }));
    setStudentsTable(response);
    setLoading((prev) => ({ ...prev, students: false }));
  };

  const handleGetAssignments = async (page: number = 0) => {
    setLoading((prev) => ({ ...prev, assignments: true }));
    const { data: response } = await a.get(`/classes/${classId}/assignments`, {
      params: { page, searchQuery: debouncedSearchQuery },
    });
    if (!response)
      return setLoading((prev) => ({ ...prev, assignments: false }));
    setAssignmentsTable(response);
    setLoading((prev) => ({ ...prev, assignments: false }));
  };

  const handleCreateAssignment = async () => {
    setLoading((prev) => ({ ...prev, createAssignment: true }));
    const { data: response } = await a.post(`/assignments`, {
      ...createAssignmentForm,
      dueDate: new Date(createAssignmentForm.dueDate),
    });
    if (!response)
      return setLoading((prev) => ({ ...prev, createAssignment: false }));
    handleGetAssignments();
    notify('Successfully created assignment!');
    setLoading((prev) => ({ ...prev, createAssignment: false }));
  };

  const handleDeleteAssignment = (assignmentId: string) => async () => {
    const { data: response } = await a.delete(`/assignments/${assignmentId}`);
    if (!response) return;
    notify('Successfully deleted assignment!');
    handleGetAssignments();
  };

  React.useEffect(() => {
    handleGetClass();
    handleGetStudents();
    handleGetAssignments();
    setLoading((prev) => ({ ...prev, tableData: false }));
  }, []);

  React.useEffect(() => {
    handleGetAssignments();
  }, [debouncedSearchQuery]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={6} md={3}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={6} md={3}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={6} md={3}>
          <Static title='Average Student Grade' description='98%' />
        </Grid>
        <Grid item xs={12} md={5}>
          <PanelCard title='Students' sx={{ height: 420.719 }}>
            <Exist
              data={loading.tableData}
              placeholder={
                <Box
                  sx={{
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <Table
                keys={['NAME', 'EMAIL', 'GRADE']}
                count={studentsTable.count}
                onPageChange={(_: unknown, page: number) =>
                  handleGetStudents(page)
                }
                page={studentsTable.page}
                rowsPerPage={5}
                loading={loading.students}
              >
                {studentsTable.data.map(({ student }) => (
                  <TableRow key={student.id}>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {formatFullName(student)}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Link href={`mailto:${student.email}`}>
                        {student.email}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Box
                        component='span'
                        sx={{
                          bgcolor: 'lightgreen',
                          p: '7px',
                          borderRadius: 4,
                          color: 'green',
                          fontWeight: 600,
                        }}
                      >
                        90%
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </Exist>
          </PanelCard>
        </Grid>
        <Grid item xs={12} md={7}>
          <PanelCard
            title={
              <Stack
                sx={{
                  px: 2,
                  pt: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
                justifyContent='space-between'
              >
                <Typography
                  sx={{ fontWeight: 600, mb: { xs: 1, sm: 0 } }}
                  variant='h6'
                >
                  Assignments
                </Typography>
                <Stack flexDirection='row'>
                  <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                  <Button
                    size='small'
                    variant='contained'
                    sx={{
                      ml: 2,
                      borderRadius: 2,
                    }}
                    onClick={() => setAssignmentModalOpen(true)}
                  >
                    <Add sx={{ pr: '2px' }} /> CREATE
                  </Button>
                </Stack>
              </Stack>
            }
            sx={{ height: 420.719 }}
          >
            <Exist
              data={loading.tableData}
              placeholder={
                <Box
                  sx={{
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <Table
                keys={[
                  'NAME',
                  'GRADING FIELD',
                  'CREATION DATE',
                  'DUE DATE',
                  '',
                ]}
                count={assignmentsTable.count}
                onPageChange={(_: unknown, page: number) =>
                  handleGetAssignments(page)
                }
                page={assignmentsTable.page}
                rowsPerPage={5}
                loading={loading.assignments}
              >
                {assignmentsTable.data.map((assignment) => (
                  <TableRow
                    key={assignment.id}
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {assignment.name}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {assignment.policyField.name}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {new Date(assignment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Link onClick={handleDeleteAssignment(assignment.id)}>
                        Delete
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </Exist>
          </PanelCard>
        </Grid>
        <Grid item xs={12}>
          <Paper variant='outlined' sx={{ p: 2, pl: 0 }}>
            <Stack flexDirection='row' justifyContent='space-between'>
              <Typography sx={{ fontWeight: 600, px: 2, mb: 2 }} variant='h6'>
                Student Performance to Class Average
              </Typography>
              <FormControl sx={{ minWidth: 120 }} size='small'>
                <InputLabel id='demo-select-small-label'>Age</InputLabel>
                {/* TODO: Change to Autoselect */}
                <Select
                  labelId='demo-select-small-label'
                  value={age}
                  label='Age'
                  onChange={(event: SelectChangeEvent) =>
                    setAge(event.target.value)
                  }
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                // @ts-ignore
                cursor='crosshair'
              >
                <defs>
                  <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey='name' />
                <YAxis ticks={[20, 40, 60, 80, 100]} />
                <CartesianGrid strokeDasharray='7 7' />
                <Tooltip />
                <Area
                  type='monotone'
                  dataKey='studentGrade'
                  stroke='#8884d8'
                  fillOpacity={1}
                  fill='url(#colorUv)'
                />
                <Area
                  type='monotone'
                  dataKey='avgGrade'
                  stroke='#82ca9d'
                  fillOpacity={1}
                  fill='url(#colorPv)'
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={assignmentModalOpen}
        handleClose={() =>
          !loading.createAssignment && setAssignmentModalOpen(false)
        }
        title='Create assignment'
        subtitle='Create a new assignment to keep track of grades!'
        buttons={[
          {
            title: 'Cancel',
            onClick: () =>
              !loading.createAssignment && setAssignmentModalOpen(false),
          },
          {
            title: 'Create',
            onClick: async () => {
              await handleCreateAssignment();
              setAssignmentModalOpen(false);
            },
          },
        ]}
        loading={loading.createAssignment}
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
              {...passFormInputProps(
                'name',
                createAssignmentForm,
                setCreateAssignmentForm,
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(_, value) => {
                value &&
                  setCreateAssignmentForm((prev) => ({
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
              {...passFormInputProps(
                'dueDate',
                createAssignmentForm,
                setCreateAssignmentForm,
              )}
            />
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
}
