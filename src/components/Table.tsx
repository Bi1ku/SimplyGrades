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
  loading,
}: {
  keys: string[];
  children: React.ReactNode;
  count: number;
  onPageChange: (_: unknown, page: number) => void;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  loading: boolean;
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
        <TableBody>
          {children}
          {count < (page + 1) * rowsPerPage && (
            <TableRow
              style={{ height: 52.6 * ((page + 1) * rowsPerPage - count) }}
            >
              <TableCell colSpan={keys.length} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter sx={{ mt: 1000 }}>
          <TableRow>
            <TablePagination
              sx={{ pointerEvents: loading ? 'none' : 'auto' }}
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
