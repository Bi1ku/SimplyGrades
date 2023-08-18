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
import TabHeader from '@/src/components/TabHeader';
import Modal from '@/src/components/Modal';

const policies = [
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c671',
  },
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c672',
  },
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c673',
  },
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c674',
  },
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c675',
  },
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c676',
  },
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c677',
  },
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c678',
  },
  {
    title: '2023 - 2024 School Year',
    sections: [
      { title: 'Homework', percentage: 0.2 },
      { title: 'Classwork', percentage: 0.3 },
      { title: 'Assessments', percentage: 0.5 },
    ],
    id: 'c451bd0d-0327-46c6-adfc-42f57514c679',
  },
];

// TODO: Add functionality to policies page
export default function Policies() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const handleCreatePolicy = async () => {};

  return (
    <Box>
      <TabHeader
        setSearchQuery={setSearchQuery}
        setCreateModalOpen={() => setCreateModalOpen(true)}
      />
      <Grid container spacing={2}>
        {policies.map((policy) => (
          <Grid item xs={12} sm={6} md={4} key={policy.id}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h5'>{policy.title}</Typography>
                {policy.sections.map((section) => (
                  <Typography
                    key={section.title}
                    sx={{ mt: 1 }}
                    variant='body2'
                  >{`${section.title}: ${
                    section.percentage * 100
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
      <Modal
        title='Create grading policy'
        subtitle='Create a new grading policy for your classes!'
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
        buttons={[
          { title: 'Cancel', onClick: () => setCreateModalOpen(false) },
          { title: 'Create', onClick: handleCreatePolicy },
        ]}
        loading={false}
      >
        <></>
      </Modal>
    </Box>
  );
}
