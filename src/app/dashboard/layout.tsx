"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Copyright from "@/src/components/Copyright";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GradingIcon from "@mui/icons-material/Grading";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUser from "@/src/hooks/user";
import useEffectV2 from "@/src/hooks/effect";
import { checkUser, formatFullName } from "@/src/utils";

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "absolute",
    [theme.breakpoints.up("lg")]: {
      position: "relative",
    },
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(9),
    }),
  },
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const [anchor, setAnchor] = React.useState<null | HTMLElement>();
  const openMenu = Boolean(anchor);
  const [open, setOpen] = React.useState(false);
  const { push } = useRouter();

  const closeMenu = () => setAnchor(null);

  useEffectV2(() => {
    if (!checkUser(user)) push("/api/auth/login");
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setAnchor(event.currentTarget)
            }
          >
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt="Avatar"
              src={user.avatar}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
            pt: 4,
          }}
        >
          {open && (
            <>
              <Box
                component="img"
                sx={{
                  height: 50,
                  ml: "auto",
                  mr: "auto",
                }}
                src="/images/logo.jpg"
                alt="Logo"
              />
              <IconButton onClick={() => setOpen((prev) => !prev)}>
                <ChevronLeftIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
        <List component="nav" sx={{ px: open ? 3 : 1 }}>
          <Card
            variant="outlined"
            sx={open ? { mb: 2, mt: 2 } : { border: "none" }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                p: 1,
                "&:last-child": {
                  paddingBottom: 1,
                },
              }}
            >
              <Avatar alt="Avatar" src={user.avatar} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="h6">{formatFullName(user)}</Typography>
                <Typography variant="caption">Assistant Teacher</Typography>
              </Box>
            </CardContent>
          </Card>

          <ListItemButton
            LinkComponent={Link}
            sx={{ borderRadius: 3 }}
            href="/dashboard"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            LinkComponent={Link}
            sx={{ borderRadius: 3 }}
            href="/dashboard/classes"
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItemButton>
          <ListItemButton
            LinkComponent={Link}
            sx={{ borderRadius: 3 }}
            href="/dashboard/policies"
          >
            <ListItemIcon>
              <GradingIcon />
            </ListItemIcon>
            <ListItemText primary="Policies" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          maxWidth="xl"
          sx={{ my: 4, pl: { xs: "87.333px", lg: "16px" } }}
        >
          {children}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
      <Menu
        anchorEl={anchor}
        open={openMenu}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={closeMenu}>My account</MenuItem>
        <MenuItem onClick={() => push("/api/auth/logout")}>Logout</MenuItem>
      </Menu>
      <Backdrop
        open={open}
        sx={{
          backgroundColor: {
            lg: "transparent",
          },
          pointerEvents: {
            lg: "none",
          },
        }}
        onClick={() => setOpen(false)}
      />
    </Box>
  );
}
