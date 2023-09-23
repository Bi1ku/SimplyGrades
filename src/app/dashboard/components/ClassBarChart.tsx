import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Text,
} from 'recharts';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import useUser from '@/src/hooks/user';
import React from 'react';
import { checkUser } from '@/src/utils';
import a from '@/src/axios';

interface GraphData {
  name: string;
  avgGrade: number;
}

// TODO: Add loading state
export default function ClassBarChart() {
  const user = useUser();
  const theme = useTheme();
  const [data, setData] = React.useState([] as GraphData[]);
  const [loading, setLoading] = React.useState(false);

  const handleGetData = async () => {
    setLoading(true);
    const { data: response } = await a.get(`/teachers/${user.id}/stats/graph`);
    if (!response) return setLoading(false);
    setData(response);
  };

  React.useEffect(() => {
    checkUser(user) && handleGetData();
  }, [user]);

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
            <XAxis
              dataKey='name'
              interval={0}
              width={30}
              label={(props: { text: string }) => (
                <Text width={30}>{props.text}</Text>
              )}
            />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey='avgGrade'
              fill={theme.palette.primary.light}
              radius={[7, 7, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}
