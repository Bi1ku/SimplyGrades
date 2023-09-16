import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from 'recharts';
import { Student } from '@prisma/client';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import a from '@/src/axios';
import { Context } from '../page';
import { formatFullName } from '@/src/utils';

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

interface GraphData {
  name: string;
  avgGrade: number;
  studentGrade: number;
}

export default function StudentToAverageGraph({
  students,
}: {
  students: { student: Student }[];
}) {
  const classId = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([] as GraphData[]);

  const handleGetGraphData = async (studentId: string) => {
    setLoading(true);
    console.log('called');
    const { data: response } = await a.get(
      `/classes/${classId}/stats/${studentId}/graph`,
    );
    console.log(response);
    if (!response) return setLoading(false);
    setData(response);
    setLoading(false);
  };

  React.useEffect(() => {
    handleGetGraphData(students[0]?.student.id);
  }, [students]);

  const studentsAutocomplete = React.useMemo(
    () =>
      students.map(({ student }) => ({
        label: formatFullName(student),
        id: student.id,
      })),
    [students],
  );

  return (
    <Grid item xs={12}>
      <Paper variant='outlined' sx={{ p: 2, pl: 0 }}>
        <Stack flexDirection='row'>
          <Typography sx={{ fontWeight: 600, px: 2, mb: 2 }} variant='h6'>
            Student Performance to Class Average
          </Typography>
          <Autocomplete
            sx={{ width: 200, ml: 'auto' }}
            onChange={(_, value) => handleGetGraphData(value?.id || '')}
            options={studentsAutocomplete}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                variant='outlined'
                label='Student'
                fullWidth
                size='small'
              />
            )}
          />
        </Stack>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            // @ts-ignore
            cursor='crosshair'
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
  );
}
