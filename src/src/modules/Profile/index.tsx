import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import GroupIcon from "@mui/icons-material/Group";

const Profile = () => {
  const admin = {
    name: "James Bond",
    email: "admin@zchhs.edu.ph",
    role: "Administrator",
    avatar: "/assets/images/admin.jpg",
    details: {
      department: "IT Department",
      position: "System Administrator",
      status: "Active",
      createdAt: "Jan 15, 2023",
      lastLogin: "July 4, 2025, 09:32 AM",
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
            px: 3,
            textAlign: "center",
          }}
        >
          <Box position="relative">
            <Avatar
              alt={admin.name}
              src={"/assets/images/user.jpg"}
              sx={{ width: 96, height: 96 }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                bottom: -2,
                right: -2,
                backgroundColor: "white",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="h6" mt={2}>
            {admin.name}
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            {admin.email}
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            fontWeight={500}
            mt={0.5}
          >
            {admin.role}
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Button size="small" variant="outlined" startIcon={<EditIcon />}>
              Edit Profile
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              startIcon={<LockResetIcon />}
            >
              Change Password
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<GroupIcon />}
            >
              Manage Users
            </Button>
          </Stack>
        </Box>

        <Divider />

        <CardContent sx={{ px: 4, py: 3 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography color="text.secondary" fontSize={13}>
                Department
              </Typography>
              <Typography fontWeight={500}>{admin.details.department}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography color="text.secondary" fontSize={13}>
                Position
              </Typography>
              <Typography fontWeight={500}>{admin.details.position}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography color="text.secondary" fontSize={13}>
                Status
              </Typography>
              <Typography
                fontWeight={500}
                color={admin.details.status === "Active" ? "green" : "red"}
              >
                {admin.details.status}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography color="text.secondary" fontSize={13}>
                Last Login
              </Typography>
              <Typography fontWeight={500}>{admin.details.lastLogin}</Typography>
            </Grid>
            <Grid size={12}>
              <Typography color="text.secondary" fontSize={13}>
                Account Created
              </Typography>
              <Typography fontWeight={500}>{admin.details.createdAt}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
