import Exist from '@/src/components/Exist';
import PanelCard from '@/src/components/PanelCard';
import { formatFullName } from '@/src/utils';
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@/src/components/Table';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Student } from '@prisma/client';
import a from '@/src/axios';
import TableCell from '@mui/material/TableCell';
import { Context } from '../page';

export default function StudentsTable() {
  const classId = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({
    data: [] as { student: Student }[],
    count: 0,
    page: 0,
  });

  const handleGetStudents = async () => {
    const { data: response } = await a.get(`/classes/${classId}/students`, {
      params: { page: 0, pageSize: 1000 },
    });
    if (!response) return setLoading(false);
    setData(response);
    setLoading(false);
  };

  React.useEffect(() => {
    handleGetStudents();
  }, []);

  return (
    <Grid item xs={12} md={5}>
      <PanelCard title='Students' sx={{ height: 420.719 }}>
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
            keys={['NAME', 'EMAIL', 'GRADE']}
            count={data.count}
            onPageChange={(_, page) => setData((prev) => ({ ...prev, page }))}
            page={data.page}
            rowsPerPage={5}
            loading={false}
          >
            {data.data
              .slice(data.page * 5, (data.page + 1) * 5)
              .map(({ student }) => (
                <TableRow key={student.id}>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {formatFullName(student)}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Link href={`mailto:${student.email}`}>
                      {student.email}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box
                      component='span'
                      sx={{
                        bgcolor: 'lightgreen',
                        p: '7px',
                        borderRadius: 4,
                        color: 'green',
                        fontWeight: 600,
                      }}
                    >
                      90%
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </Table>
        </Exist>
      </PanelCard>
    </Grid>
  );
}
