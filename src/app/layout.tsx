"use client";

import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useNotificationStore from "../hooks/notification";

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notification = useNotificationStore((state) => state);

  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>{children}</body>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={notification.open}
          autoHideDuration={5000}
          onClose={() => notification.setOpen(false)}
        >
          <Alert
            onClose={() => notification.setOpen(false)}
            severity={notification.severity}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </html>
  );
}
