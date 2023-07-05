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

export default function ClassDetail({ params }: { params: { id: string } }) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }} variant='body1'>
              AVERAGE CLASS PERFORMANCE{' '}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              90%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }} variant='body1'>
              AVERAGE CLASS PERFORMANCE{' '}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              90%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }} variant='body1'>
              AVERAGE CLASS PERFORMANCE{' '}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              90%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 500 }} variant='body1'>
              AVERAGE CLASS PERFORMANCE{' '}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              90%
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
        <Grid item xs={12} md={7}>
          <Table
            title={
              <Stack flexDirection='row' sx={{ px: 2, pt: 2 }}>
                <Typography sx={{ fontWeight: 600 }} variant='h6'>
                  Assignments
                </Typography>
                <Button sx={{ ml: 'auto' }}>
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
                <TableCell>{assignment.name}</TableCell>
                <TableCell>{assignment.type}</TableCell>
                <TableCell>
                  {new Date(assignment.creationDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}
