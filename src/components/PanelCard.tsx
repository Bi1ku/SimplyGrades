import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

export default function PanelCard({
  title,
  children,
  padding,
}: {
  title: string | React.ReactNode;
  children: React.ReactNode;
  padding?: boolean;
}) {
  return (
    <Paper variant='outlined' sx={{ p: padding ? 2 : 0 }}>
      {typeof title === 'string' ? (
        <Typography
          sx={{ fontWeight: 600, p: padding ? 0 : 2, pb: 0 }}
          variant='h6'
        >
          {title}
        </Typography>
      ) : (
        title
      )}
      {children}
    </Paper>
  );
}
