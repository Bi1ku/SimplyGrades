import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

export default function Table({
  keys,
  children,
  count,
  onPageChange,
  page,
  rowsPerPage,
  rowsPerPageOptions = [],
}: {
  keys: string[];
  children: React.ReactNode;
  count: number;
  onPageChange: () => void;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
}) {
  return (
    <TableContainer sx={{ display: 'flex', flexDirection: 'column' }}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell sx={{ fontSize: 12, whiteSpace: 'nowrap' }} key={key}>
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
          {count - (page + 1) * rowsPerPage < 0 &&
            new Array(rowsPerPage - count).fill(0).map((_, i) => (
              <TableRow key={i}>
                {new Array(keys.length).fill(0).map((_, i) => (
                  <TableCell key={i}>‎</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter sx={{ mt: 1000 }}>
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
      </MuiTable>
    </TableContainer>
  );
}
