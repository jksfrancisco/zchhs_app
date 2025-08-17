import { useLayoutStore } from "@/libs/stores/useLayoutStore";
import { useThemeStore } from "@/libs/stores/useThemeStore";
import ClassIcon from "@mui/icons-material/Class";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SunnyIcon from "@mui/icons-material/Sunny";
import TuneIcon from "@mui/icons-material/Tune";
import { Backdrop, Card, CardActionArea, CardContent, CircularProgress } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  marginTop: 60,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: 60,
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "background.primary",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  marginTop: 60,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    drawerOpen: open,
    toggleDrawer,
    settingsOpen,
    toggleSettings,
  } = useLayoutStore();

  const handleDrawerOpen = toggleDrawer;
  const handleSettingsClick = toggleSettings;
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const router = useRouter();
  const colorMode = useThemeStore();
  const isDark = colorMode.mode === "dark";

  // Profile menu state
  const [isAccountDisplay, setIsAccountDisplay] = React.useState(false);
  const handleProfileClick = () => {
    setIsAccountDisplay(!isAccountDisplay);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true); // show backdrop

    try {
      const res = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || "",
        },
      });

      if (res.ok) {
        toast.info("Logged out successfully!");
        // Redirect or reset state
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getCookie = (name: string) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Image
              src="/assets/images/zchhs.png"
              alt="logo"
              width={40}
              height={40}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ ml: 2, display: { xs: "none", md: "block" } }}
            >
              ZCHHS Student Information Portal
            </Typography>
            <Typography
              variant="h6"
              sx={{ ml: 2, display: { xs: "block", md: "none" } }}
            >
              ZCHHS SIP
            </Typography>
          </Box>

          {/* Dark mode toggle */}
          <IconButton
            sx={{ width: 35, height: 35, pt: 1.7 }}
            onClick={colorMode.toggleMode}
            color="inherit"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <NightsStayIcon />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <SunnyIcon />
                </motion.div>
              )}
            </AnimatePresence>
          </IconButton>
          {/* Profile Avatar */}
          <Box sx={{ ml: 2, position: "relative" }}>
            <IconButton
              title="Account"
              onClick={handleProfileClick}
              sx={{ p: 0 }}
            >
              <Avatar
                alt="User"
                src="/assets/images/user.jpg"
                sx={{ width: 30, height: 30 }}
              />
            </IconButton>
            {isAccountDisplay && (
              <Backdrop open={isAccountDisplay} onClick={handleProfileClick}>
                <Card
                  elevation={5}
                  sx={{
                    borderRadius: 3,
                    height: "auto",
                    width: 130,
                    position: "absolute",
                    top: 55,
                    right: 5,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    <CardContent sx={{ p: 1, pl: 2 }}>
                      <Typography>View Profile</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActionArea onClick={handleLogout}>
                    <CardContent sx={{ p: 1, pl: 2 }}>
                      <Typography>Logout</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Backdrop>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Divider />
        <List>
          {[
            { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
            { text: "Employees", path: "/employees", icon: <ClassIcon /> },
            {
              text: "Students",
              path: "/students",
              icon: <GroupAddIcon />,
            },
          ].map(({ text, path, icon }) => {
            const isSelected = router.asPath === path;

            return (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => {
                    if (router.asPath !== path) {
                      router.push(path);
                    }
                  }}
                  sx={[
                    { minHeight: 48, px: 2.5 },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      { minWidth: 0, justifyContent: "center" },
                      open ? { mr: 3 } : { mr: "auto" },
                    ]}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Collapsible Settings Group */}
        <Divider />
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={handleSettingsClick}
            sx={[
              { minHeight: 48, px: 2.5 },
              open
                ? { justifyContent: "initial" }
                : { justifyContent: "center" },
            ]}
          >
            <ListItemIcon
              sx={[
                { minWidth: 0, justifyContent: "center" },
                open ? { mr: 3 } : { mr: "auto" },
              ]}
            >
              <TuneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              sx={[open ? { opacity: 1 } : { opacity: 0 }]}
            />
            {open ? settingsOpen ? <ExpandLess /> : <ExpandMore /> : null}
          </ListItemButton>
        </ListItem>
        <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Export & Backup", "Audit Logs"].map((text, index) => (
              <ListItemButton
                key={text}
                sx={[
                  { pl: open ? 6 : 2.5 },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
                onClick={() => {
                  if (router.asPath !== `/settings/sub-nav-${index + 1}`) {
                    router.push(`/settings/sub-nav-${index + 1}`);
                  }
                }}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    open ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </Drawer>

      <DrawerHeader />
      <Box
        component="main"
        sx={{
          mt: "60px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        {children}
      </Box>

      <Backdrop
        open={isLoggingOut}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 2000,
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
          <Typography variant="h6">Logging out...</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
