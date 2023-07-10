'use client';

import PanelCard from '@/app/components/PanelCard';
import Table from '@/app/components/Table';
import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const students = [
  'John Doe',
  'Jane Doe',
  'Eric Lou',
  'John Smith',
  'Jane Smith',
  'Eric Smith',
  'John Lou',
  'Jane Lou',
  'Eric Doe',
  'Jane Lou',
  'Eric Doe',
  'Jane Lou',
  'Eric Doe',
  'Jane Lou',
  'Eric Doe',
];

const assignments = [
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c675',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c676',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
  },
  {
    name: 'Assignment 1',
    dueDate: '10/10/2021',
    creationDate: '10/10/2021',
    type: 'Homework',
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
  },
];

export default function AssignmentGrading() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <PanelCard
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
        >
          <Table
            keys={['NAME', 'TYPE', 'CREATION DATE', 'DUE DATE']}
            count={assignments.length}
            onPageChange={() => ''}
            page={0}
            rowsPerPage={10}
            rowsPerPageOptions={[5, 10, 15]}
          >
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {assignment.name}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {assignment.type}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {new Date(assignment.creationDate).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </PanelCard>
      </Grid>
      <Grid item xs={4} columnSpacing={0}>
        <Box sx={{ maxHeight: '77.5vh', overflow: 'auto' }}>
          <PanelCard title='Assignment 1 Grading'>
            {students.map((student, i) => (
              <Box key={i}>
                <Stack
                  flexDirection='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{ my: 2, px: 2 }}
                >
                  {student}
                  <Stack flexDirection='row' alignItems='center'>
                    <TextField
                      variant='filled'
                      size='small'
                      inputProps={{
                        style: {
                          height: 30,
                          width: 30,
                          padding: 0,
                          paddingLeft: 5,
                          paddingRight: 5,
                        },
                      }}
                    />
                    <Typography variant='body2' sx={{ ml: 1 }}>
                      / 100
                    </Typography>
                  </Stack>
                </Stack>
                <Divider />
              </Box>
            ))}
          </PanelCard>
        </Box>
      </Grid>
    </Grid>
  );
}
