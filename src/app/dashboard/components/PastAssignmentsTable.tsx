import PanelCard from '@/src/components/PanelCard';
import Table from '@/src/components/Table';
import Grid from '@mui/material/Grid';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { checkUser } from '@/src/utils';
import useUser from '@/src/hooks/user';
import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchBar from '@/src/components/SearchBar';
import { useDebounce } from 'use-debounce';
import a from '@/src/axios';
import { Assignment, Class } from '@prisma/client';

interface AssignmentWithIncludes extends Assignment {
  class: Class;
}

export default function PastAssignmentTable() {
  const user = useUser();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({
    data: [] as AssignmentWithIncludes[],
    count: 0,
    page: 0,
  });
  const [pageLoading, setPageLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const handleGetData = async (page: number = 0) => {
    setPageLoading(true);
    const { data: response } = await a.get(
      `/teachers/${user.id}/stats/assignments`,
      {
        params: { page, searchQuery },
      },
    );
    if (!response) return setPageLoading(false);
    setData(response);
    setPageLoading(false);
  };

  React.useEffect(() => {
    if (checkUser(user)) {
      handleGetData();
      setLoading(false);
    }
  }, [user, debouncedSearchQuery]);

  return (
    <Grid item xs={12} md={7}>
      <PanelCard
        title={
          <Stack
            sx={{ px: 2, pt: 2 }}
            flexDirection='row'
            justifyContent='space-between'
          >
            <Typography
              sx={{ fontWeight: 600, mb: { xs: 1, sm: 0 } }}
              variant='h6'
              noWrap
            >
              Past Assignments
            </Typography>
            <SearchBar setSearchQuery={setSearchQuery} />
          </Stack>
        }
      >
        <Table
          keys={['NAME', 'CLASS', 'CREATION DATE', 'DUE DATE']}
          count={data.count}
          onPageChange={(_, page) => handleGetData(page)}
          page={data.page}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 15]}
          loading={pageLoading}
        >
          {data.data.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {assignment.name}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {assignment.class.name}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {new Date(assignment.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {new Date(assignment.dueDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </PanelCard>
    </Grid>
  );
}
