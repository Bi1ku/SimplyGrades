'use client';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import dynamic from 'next/dynamic';
import useTheme from '@mui/material/styles/useTheme';
import Table from '@/app/components/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from 'next/link';
import { formatContactNumber } from '@/utils/format';
import Static from '../components/Static';
import PanelCard from '../components/PanelCard';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const BarChart = dynamic(
  () => import('recharts').then((recharts) => recharts.BarChart),
  { ssr: false },
);

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
  },
];

const students = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c675',
    contactNumber: '6463010911',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c664',
    contactNumber: '6463010911',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
    contactNumber: '6463010911',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c678',
    contactNumber: '6463010911',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c679',
    contactNumber: '6463010911',
  },
];

const assignments = [
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c675',
    class: 'Honors Pre-Calc',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c676',
    class: 'Honors Pre-Calc',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
    class: 'Honors Pre-Calc',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c678',
    class: 'Honors Pre-Calc',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c679',
    class: 'Honors Pre-Calc',
  },
];

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={6}>
            <Static title='Average Student Grade' description='98%' />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static title='Average Student Grade' description='98%' />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static title='Average Student Grade' description='98%' />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static title='Average Student Grade' description='98%' />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static title='Average Student Grade' description='98%' />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static title='Average Student Grade' description='98%' />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Paper
          variant='outlined'
          sx={{ p: 2, pl: 0, width: '100%', height: '100%' }}
        >
          <Typography sx={{ fontWeight: 600, px: 2, mb: 2 }} variant='h6'>
            Classes' Average Performance
          </Typography>
          <ResponsiveContainer height='83%'>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray='7 7' vertical={false} />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip children={<h1>hi</h1>} title='hi' />
              <Bar
                dataKey='pv'
                fill={theme.palette.primary.light}
                radius={[7, 7, 0, 0]}
              />
              <Bar
                dataKey='uv'
                fill={theme.palette.primary.dark}
                radius={[7, 7, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item md={5} xs={12}>
        <PanelCard
          title={
            <Stack
              sx={{ px: 2, pt: 2 }}
              flexDirection='row'
              justifyContent='space-between'
            >
              <Typography
                sx={{ fontWeight: 600, mb: { xs: 1, sm: 0 } }}
                variant='h6'
                noWrap
              >
                All Students
              </Typography>
              <OutlinedInput
                inputProps={{
                  style: {
                    padding: 0,
                    width: 140,
                  },
                }}
                sx={{
                  px: 2,
                  borderRadius: 2,
                }}
                placeholder='Search...'
                size='small'
              />
            </Stack>
          }
        >
          <Table
            keys={['NAME', 'EMAIL', 'CONTACT NUMBER']}
            count={students.length}
            onPageChange={() => ''}
            page={0}
            rowsPerPage={5}
            rowsPerPageOptions={[5, 10, 15]}
          >
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {student.name}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Link href={`mailto:${student.email}`}>{student.email}</Link>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Link href={`tel:${student.contactNumber}`}>
                    {formatContactNumber(student.contactNumber)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </PanelCard>
      </Grid>
      <Grid item xs={12} md={7}>
        <PanelCard title='All Past Assignments'>
          <Table
            keys={['NAME', 'CLASS', 'CREATION DATE', 'DUE DATE']}
            count={assignments.length}
            onPageChange={() => ''}
            page={0}
            rowsPerPage={5}
            rowsPerPageOptions={[5, 10, 15]}
          >
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {assignment.name}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {assignment.class}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {assignment.creationDate}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {assignment.dueDate}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </PanelCard>
      </Grid>
    </Grid>
  );
}
