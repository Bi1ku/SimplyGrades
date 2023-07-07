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
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    contactNumber: '6463010911',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    contactNumber: '6463010911',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    contactNumber: '6463010911',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    contactNumber: '6463010911',
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    contactNumber: '6463010911',
  },
];

const assignments = [
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    class: 'Honors Pre-Calc',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    class: 'Honors Pre-Calc',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    class: 'Honors Pre-Calc',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    class: 'Honors Pre-Calc',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
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
            <Paper variant='outlined' sx={{ p: 2 }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 500,
                  color: (theme) => theme.palette.grey[600],
                  letterSpacing: 0.4,
                }}
              >
                Average Student Grade
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 600,
                  mt: '10px',
                }}
              >
                98%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Paper variant='outlined' sx={{ p: 2 }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 500,
                  color: (theme) => theme.palette.grey[600],
                  letterSpacing: 0.4,
                }}
              >
                Average Student Grade
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 600,
                  mt: '10px',
                }}
              >
                98%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Paper variant='outlined' sx={{ p: 2 }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 500,
                  color: (theme) => theme.palette.grey[600],
                  letterSpacing: 0.4,
                }}
              >
                Average Student Grade
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 600,
                  mt: '10px',
                }}
              >
                98%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Paper variant='outlined' sx={{ p: 2 }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 500,
                  color: (theme) => theme.palette.grey[600],
                  letterSpacing: 0.4,
                }}
              >
                Average Student Grade
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 600,
                  mt: '10px',
                }}
              >
                98%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Paper variant='outlined' sx={{ p: 2 }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 500,
                  color: (theme) => theme.palette.grey[600],
                  letterSpacing: 0.4,
                }}
              >
                Average Student Grade
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 600,
                  mt: '10px',
                }}
              >
                98%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Paper variant='outlined' sx={{ p: 2 }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 500,
                  color: (theme) => theme.palette.grey[600],
                  letterSpacing: 0.4,
                }}
              >
                Average Student Grade
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 600,
                  mt: '10px',
                }}
              >
                98%
              </Typography>
            </Paper>
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
        <Table
          title='All My Students'
          keys={['NAME', 'EMAIL', 'CONTACT NUMBER']}
          count={students.length}
          onPageChange={() => ''}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 15]}
        >
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Typography variant='body2' noWrap>
                  {student.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Link href={`mailto:${student.email}`}>
                  <Typography variant='body2' noWrap>
                    {student.email}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`tel:${student.contactNumber}`}>
                  <Typography variant='body2' noWrap>
                    {formatContactNumber(student.contactNumber)}
                  </Typography>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Grid>
      <Grid item xs={12} md={7}>
        <Table
          title='Upcoming Assignments'
          keys={['NAME', 'CLASS', 'CREATION DATE', 'DUE DATE']}
          count={assignments.length}
          onPageChange={() => ''}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 15]}
        >
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>
                <Typography variant='body2' noWrap>
                  {assignment.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' noWrap>
                  {assignment.class}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' noWrap>
                  {assignment.creationDate}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' noWrap>
                  {assignment.dueDate}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Grid>
    </Grid>
  );
}
