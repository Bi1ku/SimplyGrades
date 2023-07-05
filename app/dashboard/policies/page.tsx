'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

const policies = [
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
  {
    title: '2023 - 2024 School Year',
    types: [
      { type: 'Homework', percentage: 0.2 },
      { type: 'Classwork', percentage: 0.3 },
      { type: 'Assessments', percentage: 0.5 },
    ],
    id: 1,
  },
];

export default function Policies() {
  const [open, setOpen] = React.useState(false);

  return (
    <Grid container spacing={2}>
      {policies.map((v) => (
        <Grid item xs={12} sm={6} md={4} key={v.id}>
          <Card>
            <CardContent>
              <Typography variant='h5'>{v.title}</Typography>
              {v.types.map((v) => (
                <Typography sx={{ mt: 1 }} variant='body2'>{`${v.type}: ${
                  v.percentage * 100
                }%`}</Typography>
              ))}
            </CardContent>
            <Divider />
            <CardActions>
              <Box sx={{ ml: 'auto' }}>
                <Button onClick={() => setOpen(true)}>Delete</Button>
              </Box>
              <Button size='small'>Edit</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
