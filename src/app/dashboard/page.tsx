'use client';

import Grid from '@mui/material/Grid';
import Statics from './components/Statics';
import ClassBarChart from './components/ClassBarChart';
import AllStudentsTable from './components/AllStudentsTable';
import PastAssignmentsTable from './components/PastAssignmentsTable';

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Statics />
      <ClassBarChart />
      <AllStudentsTable />
      <PastAssignmentsTable />
    </Grid>
  );
}
