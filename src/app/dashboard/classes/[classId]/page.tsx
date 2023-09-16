'use client';

import Grid from '@mui/material/Grid';
import React from 'react';
import AssignmentsTable from './components/AssignmentsTable';
import StudentToAverageGraph from './components/StudentToAverageGraph';
import StudentsTable from './components/StudentsTable';
import StaticData from './components/StaticData';
import a from '@/src/axios';
import { Student } from '@prisma/client';

export const Context = React.createContext('');

export default function ClassDetail({
  params,
}: {
  params: { classId: string };
}) {
  const { classId } = params;
  const [loading, setLoading] = React.useState(false);
  const [students, setStudents] = React.useState([] as { student: Student }[]);

  const handleGetStudents = async () => {
    const { data: response } = await a.get(`/classes/${classId}/students`, {
      params: { page: 0, pageSize: 1000 },
    });
    if (!response) return setLoading(false);
    setStudents(response.data);
    setLoading(false);
  };

  React.useEffect(() => {
    handleGetStudents();
  }, []);
  return (
    <Context.Provider value={classId}>
      <Grid container spacing={2}>
        <StaticData />
        <StudentsTable students={students} loading={loading} />
        <AssignmentsTable />
        <StudentToAverageGraph students={students} />
      </Grid>
    </Context.Provider>
  );
}
