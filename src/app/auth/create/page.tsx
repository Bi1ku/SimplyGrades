"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "@/src/components/Copyright";
import { notify, passFormInputProps } from "@/src/utils";
import Stack from "@mui/material/Stack";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import a from "@/src/axios";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { push } = useRouter();
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    type: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const { data: response } = await a.post("/auth/create", form);
    if (!response) return setLoading(false);
    setLoading(false);
    notify("Successfully created account!");
    localStorage.setItem("user", JSON.stringify(response));
    push("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Stack flexDirection="row" gap={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              autoFocus
              {...passFormInputProps("firstName", form, setForm)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              autoFocus
              {...passFormInputProps("lastName", form, setForm)}
            />
          </Stack>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            {...passFormInputProps("email", form, setForm)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            {...passFormInputProps("password", form, setForm)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.type}
              label="Age"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <MenuItem value={"STUDENT"}>Student</MenuItem>
              <MenuItem value={"TEACHER"}>Teacher</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
            {loading && <CircularProgress size="small" sx={{ ml: 2 }} />}
          </Button>
          <Link href="auth/login" variant="body2">
            {"Have an account? "}
          </Link>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
