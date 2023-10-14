import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { Student } from "@prisma/client";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import a from "@/src/axios";
import { Context } from "../page";
import { formatFullName } from "@/src/utils";

interface GraphData {
  name: string;
  avgGrade: number;
  studentGrade: number;
}

export default function StudentToAverageGraph({
  students,
}: {
  students: { student: Student }[];
}) {
  const classId = React.useContext(Context);
  const [data, setData] = React.useState([] as GraphData[]);

  const handleGetGraphData = async (studentId: string) => {
    const { data: response } = await a.get(
      `/classes/${classId}/stats/${studentId}/graph`
    );
    if (!response) return;
    setData(response);
  };

  React.useEffect(() => {
    handleGetGraphData(students[0]?.student.id);
  }, [students]);

  const autocompleteData = React.useMemo(
    () =>
      students.map(({ student }) => ({
        label: formatFullName(student),
        id: student.id,
      })),
    [students]
  );

  return (
    <Grid item xs={12}>
      <Paper variant="outlined" sx={{ p: 2, pl: 0 }}>
        <Stack flexDirection="row">
          <Typography sx={{ fontWeight: 600, px: 2, mb: 2 }} variant="h6">
            Student Performance to Class Average
          </Typography>
          <Autocomplete
            sx={{ width: 200, ml: "auto" }}
            onChange={(_, value) => handleGetGraphData(value?.id || "")}
            defaultValue={autocompleteData[0]}
            options={autocompleteData}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                variant="outlined"
                label="Student"
                fullWidth
                size="small"
              />
            )}
          />
        </Stack>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            // @ts-ignore
            cursor="crosshair"
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis ticks={[20, 40, 60, 80, 100]} />
            <CartesianGrid strokeDasharray="7 7" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="studentGrade"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="avgGrade"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}
