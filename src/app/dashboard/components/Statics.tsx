import a from "@/src/axios";
import Exist from "@/src/components/Exist";
import Static from "@/src/components/Static";
import useUser from "@/src/hooks/user";
import { checkUser } from "@/src/utils";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

interface StaticsData {
  ungradedCount: number;
  gradedCount: number;
  studentCount: number;
  classCount: number;
}

export default function Statics({ avgGrade }: { avgGrade: number }) {
  const [statics, setStatics] = React.useState({
    ungradedCount: 0,
    gradedCount: 0,
    studentCount: 0,
    classCount: 0,
  } as StaticsData);
  const [loading, setLoading] = React.useState(true);
  const user = useUser();

  const handleGetStatics = async () => {
    const { data: response } = await a.get(
      `/teachers/${user.id}/stats/statics`
    );
    if (!response) return setLoading(true);
    setStatics(response);
    setLoading(false);
  };

  React.useEffect(() => {
    checkUser(user) && handleGetStatics();
  }, [user]);

  return (
    <Exist
      data={loading}
      placeholder={
        <Grid item xs={12} lg={4}>
          <Grid container spacing={2}>
            {new Array(6).fill(0).map((_, i) => (
              <Grid item xs={6} md={4} lg={6}>
                <Skeleton
                  variant="rectangular"
                  height={95}
                  sx={{ borderRadius: "5px" }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      }
    >
      <Grid item xs={12} lg={4}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={6}>
            <Static
              title="Total Students"
              description={statics.studentCount.toString()}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static
              title="Average Student Grade"
              description={`${avgGrade}%`}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static
              title="Graded Assignments"
              description={statics.gradedCount.toString()}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static
              title="Ungraded Assignments"
              description={statics.ungradedCount.toString()}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static
              title="Total Classes"
              description={statics.classCount.toString()}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={6}>
            <Static title="Teacher Rating" description="TBA" />
          </Grid>
        </Grid>
      </Grid>
    </Exist>
  );
}
