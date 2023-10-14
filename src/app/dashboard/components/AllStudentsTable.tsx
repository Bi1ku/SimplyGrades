import PanelCard from "@/src/components/PanelCard";
import SearchBar from "@/src/components/SearchBar";
import Table from "@/src/components/Table";
import { formatContactNumber } from "@/src/utils";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Link from "next/link";
import React from "react";
import a from "@/src/axios";

const students = [
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    id: "c451bd0d-0327-46c6-adfc-42f57514c675",
    contactNumber: "6463010911",
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    id: "c451bd0d-0327-46c6-adfc-42f57514c664",
    contactNumber: "6463010911",
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    id: "c451bd0d-0327-46c6-adfc-42f57514c677",
    contactNumber: "6463010911",
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    id: "c451bd0d-0327-46c6-adfc-42f57514c678",
    contactNumber: "6463010911",
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    id: "c451bd0d-0327-46c6-adfc-42f57514c679",
    contactNumber: "6463010911",
  },
];

export default function AllStudentsTable() {
  const [searchQuery, setSearchQuery] = React.useState("");
  // const [students, setStudents] = React.useState();
  const [page, setPage] = React.useState(0);

  const handleGetStudents = async () => {};

  React.useEffect(() => {
    handleGetStudents();
  }, []);

  return (
    <Grid item md={5} xs={12}>
      <PanelCard
        title={
          <Stack
            sx={{ px: 2, pt: 2 }}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{ fontWeight: 600, mb: { xs: 1, sm: 0 } }}
              variant="h6"
              noWrap
            >
              All Students
            </Typography>
            <SearchBar setSearchQuery={setSearchQuery} />
          </Stack>
        }
      >
        <Table
          keys={["NAME", "EMAIL", "CONTACT NUMBER"]}
          count={students.length}
          onPageChange={() => ""}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 15]}
          loading={false}
        >
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                {student.name}
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Link href={`mailto:${student.email}`}>{student.email}</Link>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Link href={`tel:${student.contactNumber}`}>
                  {formatContactNumber(student.contactNumber)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </PanelCard>
    </Grid>
  );
}
