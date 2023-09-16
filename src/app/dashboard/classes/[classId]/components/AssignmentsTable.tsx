import Exist from '@/src/components/Exist';
import PanelCard from '@/src/components/PanelCard';
import SearchBar from '@/src/components/SearchBar';
import { Add } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@/src/components/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React from 'react';
import Link from '@mui/material/Link';
import a from '@/src/axios';
import { useDebounce } from 'use-debounce';
import { notify } from '@/src/utils';
import CreateAssignmentModal from './CreateAssignmentModal';
import { Assignment, PolicyField } from '@prisma/client';
import GradingModal from './GradingModal';
import { Context } from '../page';

interface AssignmentWithIncludes extends Assignment {
  policyField: PolicyField;
}

export default function AssignmentsTable() {
  const classId = React.useContext(Context);
  const [assignmentId, setAssignmentId] = React.useState('');
  const [gradingModalOpen, setGradingModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [creationModalOpen, setCreationModalOpen] = React.useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [data, setData] = React.useState({
    data: [] as AssignmentWithIncludes[],
    count: 0,
    page: 0,
  });
  const [gradingFields, setGradingFields] = React.useState([] as PolicyField[]);

  const handleGetGradingFields = async () => {
    const { data: response } = await a.get(`/classes/${classId}`);
    if (!response) return;
    setGradingFields(
      response.policy.policyFields.map((field: PolicyField) => ({
        id: field.id,
        label: field.name,
      })),
    );
  };

  const handleGetAssignments = React.useCallback(
    async (page: number = 0) => {
      setPageLoading(true);
      const { data: response } = await a.get(
        `/classes/${classId}/assignments`,
        {
          params: { page, searchQuery },
        },
      );
      if (!response) return setPageLoading(false);
      setData(response);
      setPageLoading(false);
    },
    [debouncedSearchQuery],
  );

  const handleDeleteAssignment = (assignmentId: string) => async () => {
    const { data: response } = await a.delete(`/assignments/${assignmentId}`);
    if (!response) return;
    notify('Successfully deleted assignment!');
    handleGetAssignments();
  };

  React.useEffect(() => {
    handleGetAssignments();
    setLoading(false);
    handleGetGradingFields();
  }, []);

  React.useEffect(() => {
    handleGetAssignments();
  }, [debouncedSearchQuery]);

  return (
    <>
      <Grid item xs={12} md={7}>
        <PanelCard
          title={
            <Stack
              sx={{
                px: 2,
                pt: 2,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
              justifyContent='space-between'
            >
              <Typography
                sx={{ fontWeight: 600, mb: { xs: 1, sm: 0 } }}
                variant='h6'
              >
                Assignments
              </Typography>
              <Stack flexDirection='row'>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <Button
                  size='small'
                  variant='contained'
                  sx={{
                    ml: 2,
                    borderRadius: 2,
                  }}
                  onClick={() => setCreationModalOpen(true)}
                >
                  <Add sx={{ pr: '2px' }} /> CREATE
                </Button>
              </Stack>
            </Stack>
          }
          sx={{ height: 420.719 }}
        >
          <Exist
            data={loading}
            placeholder={
              <Box
                sx={{
                  height: '100%',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Table
              keys={['NAME', 'GRADING FIELD', 'CREATION DATE', 'DUE DATE', '']}
              count={data.count}
              onPageChange={(_, page) => handleGetAssignments(page)}
              page={data.page}
              rowsPerPage={5}
              loading={pageLoading}
            >
              {data.data.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell
                    onClick={async () => {
                      setAssignmentId(assignment.id);
                      setGradingModalOpen(true);
                    }}
                    sx={{
                      whiteSpace: 'nowrap',
                      '&:hover': { cursor: 'pointer' },
                    }}
                  >
                    {assignment.name}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {assignment.policyField.name}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {new Date(assignment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    <Link onClick={handleDeleteAssignment(assignment.id)}>
                      Delete
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </Exist>
        </PanelCard>
      </Grid>
      <CreateAssignmentModal
        refetch={handleGetAssignments}
        open={creationModalOpen}
        setOpen={setCreationModalOpen}
        gradingFields={gradingFields}
        classId={classId}
      />
      <GradingModal
        open={gradingModalOpen}
        setOpen={setGradingModalOpen}
        assignmentId={assignmentId}
      />
    </>
  );
}
