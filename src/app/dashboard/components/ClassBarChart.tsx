import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
  },
];

export default function ClassBarChart() {
  const theme = useTheme();

  return (
    <Grid item xs={12} lg={8}>
      <Paper
        variant='outlined'
        sx={{ p: 2, pl: 0, width: '100%', height: '100%' }}
      >
        <Typography sx={{ fontWeight: 600, px: 2, mb: 2 }} variant='h6'>
          Classes' Average Performance
        </Typography>
        <ResponsiveContainer height='83%'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='7 7' vertical={false} />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip children={<h1>hi</h1>} />
            <Bar
              dataKey='pv'
              fill={theme.palette.primary.light}
              radius={[7, 7, 0, 0]}
            />
            <Bar
              dataKey='uv'
              fill={theme.palette.primary.dark}
              radius={[7, 7, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}
