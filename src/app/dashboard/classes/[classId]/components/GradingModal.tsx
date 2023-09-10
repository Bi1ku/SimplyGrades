import a from '@/src/axios';
import Modal from '@/src/components/Modal';
import { formatFullName, notify } from '@/src/utils';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Student, StudentsToAssignments } from '@prisma/client';
import React from 'react';

interface StudentsToAssignmentsWithIncludes extends StudentsToAssignments {
  student: Student;
}

interface GradeFormField {
  studentId: string;
  grade: number;
}

export default function GradingModal({
  open,
  setOpen,
  assignmentId,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  assignmentId: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [gradeLoading, setGradeLoading] = React.useState(false);
  const [grades, setGrades] = React.useState(
    [] as StudentsToAssignmentsWithIncludes[],
  );
  const [gradeForm, setGradeForm] = React.useState([] as GradeFormField[]);

  const handleGetGrades = async () => {
    setLoading(true);
    const { data: response } = await a.get(
      `/assignments/${assignmentId}/grades`,
    );
    if (!response) return;
    setGrades(response);
    setLoading(false);
  };

  const handleGradeAssignment = async () => {
    setGradeLoading(true);
    const { data: response } = await a.post(
      `/assignments/${assignmentId}/grades`,
      gradeForm,
    );
    if (!response) return setGradeLoading(false);
    handleGetGrades();
    notify('Successfully graded assignment!');
    setGradeLoading(false);
    setOpen(false);
  };

  const handleGradeChange =
    (studentId: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const dupGradeForm = [...gradeForm];
      const index = dupGradeForm.findIndex(
        (field) => field.studentId === studentId,
      );

      if (index === -1) dupGradeForm.push({ studentId, grade: 0 });
      else dupGradeForm[index].grade = +e.target.value;

      setGradeForm(dupGradeForm);
    };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      setGradeForm([]);
      setGrades([]);
    }
  };

  React.useEffect(() => {
    open && assignmentId && handleGetGrades();
  }, [open]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title='Grade assignment'
      subtitle='Grade assignments to keep track of student and class performance!'
      buttons={[
        { title: 'Cancel', onClick: handleClose },
        {
          title: 'Grade',
          onClick: handleGradeAssignment,
        },
      ]}
      loading={gradeLoading}
    >
      {loading ? (
        <Box sx={{ display: 'grid', placeItems: 'center', p: 4, mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        grades.map((grade, i) => (
          <React.Fragment key={i}>
            <Stack
              sx={{ my: 1 }}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='body2'>
                {formatFullName(grade.student)}
              </Typography>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='flex-end'
              >
                <TextField
                  size='small'
                  variant='standard'
                  defaultValue={grade.grade}
                  sx={{ width: 1 / 2 }}
                  type='number'
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  onChange={handleGradeChange(grade.studentId)}
                />
                <Typography variant='body2' sx={{ ml: 1 }}>
                  / 100
                </Typography>
              </Stack>
            </Stack>
            <Divider />
          </React.Fragment>
        ))
      )}
    </Modal>
  );
}
