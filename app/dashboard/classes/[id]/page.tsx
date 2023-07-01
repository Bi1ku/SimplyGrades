'use client';

import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Table from '@/app/components/Table';

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

export default function ClassDetail({ params }: { params: { id: string } }) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }} variant='body1'>
              AVERAGE CLASS PERFORMANCE{' '}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              90%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }} variant='body1'>
              AVERAGE CLASS PERFORMANCE{' '}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              90%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }} variant='body1'>
              AVERAGE CLASS PERFORMANCE{' '}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              90%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }} variant='body1'>
              AVERAGE CLASS PERFORMANCE{' '}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              90%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Table
            title='Students'
            keys={['NAME', 'EMAIL', 'GRADE']}
            count={students.length}
            onPageChange={() => ''}
            page={0}
            rowsPerPage={5}
          >
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Link href={`mailto:${student.email}`}>{student.email}</Link>
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
        <Grid item xs={7}>
          <Table
            title='Assignments'
            keys={['NAME', 'EMAIL', 'GRADE']}
            count={students.length}
            onPageChange={() => ''}
            page={0}
            rowsPerPage={5}
          >
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Link href={`mailto:${student.email}`}>{student.email}</Link>
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
      </Grid>
    </Box>
  );
}
