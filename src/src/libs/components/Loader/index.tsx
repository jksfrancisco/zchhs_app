import { Box, CircularProgress, Typography } from "@mui/material";

export default function AppLoader() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body1">Loading...</Typography>
    </Box>
  );
}
