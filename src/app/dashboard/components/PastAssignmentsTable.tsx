import PanelCard from '@/src/components/PanelCard';
import Table from '@/src/components/Table';
import Grid from '@mui/material/Grid';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

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

export default function PastAssignmentsTable() {
  return (
    <Grid item xs={12} md={7}>
      <PanelCard title='All Past Assignments'>
        <Table
          keys={['NAME', 'CLASS', 'CREATION DATE', 'DUE DATE']}
          count={assignments.length}
          onPageChange={() => ''}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 15]}
          loading={false}
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
  );
}
