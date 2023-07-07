'use client';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';

export default function Copyright({
  title,
  keys,
  children,
  count,
  onPageChange,
  page,
  rowsPerPage,
  rowsPerPageOptions = [],
}: {
  title: string | React.ReactNode;
  keys: string[];
  children: React.ReactNode;
  count: number;
  onPageChange: () => void;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
}) {
  return (
    <TableContainer component={Paper}>
      <Box>
        {typeof title === 'string' ? (
          <Typography sx={{ fontWeight: 600, px: 2, pt: 2 }} variant='h6'>
            {title}
          </Typography>
        ) : (
          title
        )}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell sx={{ fontSize: 12 }}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              onPageChange={onPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}