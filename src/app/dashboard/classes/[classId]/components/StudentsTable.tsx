import Exist from "@/src/components/Exist";
import PanelCard from "@/src/components/PanelCard";
import { formatFullName } from "@/src/utils";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@/src/components/Table";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";
import { Student } from "@prisma/client";
import TableCell from "@mui/material/TableCell";

export default function StudentsTable({
  students,
  loading,
}: {
  students: { student: Student }[];
  loading: boolean;
}) {
  const [page, setPage] = React.useState(0);

  return (
    <Grid item xs={12} md={5}>
      <PanelCard title="Students" sx={{ height: 420.719 }}>
        <Exist
          data={loading}
          placeholder={
            <Box
              sx={{
                height: "100%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Table
            keys={["NAME", "EMAIL", "GRADE"]}
            count={students.length}
            onPageChange={(_, page) => setPage(page)}
            page={page}
            rowsPerPage={5}
            loading={false}
          >
            {students.slice(page * 5, (page + 1) * 5).map(({ student }) => (
              <TableRow key={student.id}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {formatFullName(student)}
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Link href={`mailto:${student.email}`}>{student.email}</Link>
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "lightgreen",
                      p: "7px",
                      borderRadius: 4,
                      color: "green",
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
