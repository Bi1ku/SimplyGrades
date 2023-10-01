'use client';

import Grid from '@mui/material/Grid';
import ClassBarChart from './components/ClassBarChart';
import AllStudentsTable from './components/AllStudentsTable';
import PastAssignmentsTable from './components/PastAssignmentsTable';

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <ClassBarChart />
      <AllStudentsTable />
      <PastAssignmentsTable />
    </Grid>
  );
}
