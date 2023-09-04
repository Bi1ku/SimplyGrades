'use client';

import Grid from '@mui/material/Grid';
import React from 'react';
import AssignmentsTable from './components/AssignmentsTable';
import StudentToAverageTable from './components/StudentToAverageTable';
import StudentsTable from './components/StudentsTable';
import StaticData from './components/StaticData';

export const Context = React.createContext('');

export default function ClassDetail({
  params,
}: {
  params: { classId: string };
}) {
  return (
    <Context.Provider value={params.classId}>
      <Grid container spacing={2}>
        <StaticData />
        <StudentsTable />
        <AssignmentsTable />
        <StudentToAverageTable />
      </Grid>
    </Context.Provider>
  );
}
