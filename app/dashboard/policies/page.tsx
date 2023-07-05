'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';

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
    <Box>
      <Stack flexDirection='row' sx={{ mb: 2 }}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Box
            sx={{
              padding: 2,
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder='Search…'
            sx={{
              color: 'inherit',
              '& .MuiInputBase-input': {
                padding: 1,
                paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)})`,
                transition: (theme) => theme.transitions.create('width'),
                width: { xs: '18ch', sm: '30ch' },
                '&:focus': {
                  sm: {
                    width: '34ch',
                  },
                  xs: {
                    width: '22ch',
                  },
                },
              },
            }}
          />
        </Box>
        <Button
          variant='contained'
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 'auto',
          }}
        >
          <Add sx={{ pr: '2px' }} /> CREATE
        </Button>
      </Stack>
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
    </Box>
  );
}
