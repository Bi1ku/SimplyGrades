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

export default function StudentToAverageTable() {
  const [age, setAge] = React.useState('');
  return (
    <Grid item xs={12}>
      <Paper variant='outlined' sx={{ p: 2, pl: 0 }}>
        <Stack flexDirection='row' justifyContent='space-between'>
          <Typography sx={{ fontWeight: 600, px: 2, mb: 2 }} variant='h6'>
            Student Performance to Class Average
          </Typography>
          <FormControl sx={{ minWidth: 120 }} size='small'>
            <InputLabel id='demo-select-small-label'>Age</InputLabel>
            {/* TODO: Change to Autoselect */}
            <Select
              labelId='demo-select-small-label'
              value={age}
              label='Age'
              onChange={(event: SelectChangeEvent) =>
                setAge(event.target.value)
              }
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
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
