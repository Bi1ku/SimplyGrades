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
    <TableContainer>
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
      </MuiTable>
    </TableContainer>
  );
}
