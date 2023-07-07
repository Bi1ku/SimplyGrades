'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Table from '@/app/components/Table';
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
import useTheme from '@mui/material/styles/useTheme';

const AreaChart = dynamic(
  () => import('recharts').then((recharts) => recharts.AreaChart),
  { ssr: false },
);

const students = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    grade: 96,
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    grade: 96,
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    grade: 96,
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    grade: 96,
  },
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
    grade: 96,
  },
];

const assignments = [
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
  },
];

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

export default function ClassDetail({ params }: { params: { id: string } }) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={3}>
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
        <Grid item xs={12} md={5}>
          <Table
            title='Students'
            keys={['NAME', 'EMAIL', 'GRADE']}
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
                    {' '}
                    <Typography variant='body2' noWrap>
                      {student.email}
                    </Typography>
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
                    {student.grade}%
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Grid>
        <Grid item xs={12} md={7}>
          <Table
            title={
              <Stack flexDirection='row' sx={{ px: 2, pt: 2 }}>
                <Typography sx={{ fontWeight: 600 }} variant='h6'>
                  Assignments
                </Typography>
                <Button sx={{ ml: 'auto', p: 0, px: 2 }}>
                  <Add /> Create
                </Button>
              </Stack>
            }
            keys={['NAME', 'TYPE', 'CREATION DATE', 'DUE DATE']}
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
                  {' '}
                  <Typography variant='body2' noWrap>
                    {assignment.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' noWrap>
                    {new Date(assignment.creationDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' noWrap>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Paper variant='outlined' sx={{ p: 2, pl: 0 }}>
            <Typography sx={{ fontWeight: 600, px: 2, mb: 2 }} variant='h6'>
              Student Performance to Class Average
            </Typography>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
    </Box>
  );
}
