import { Box, Typography } from "@mui/material";
import Image from "next/image";

const NotFound = () => {
  return (
    <>
      <Box
        sx={{
          height: "calc(100vh - 110px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image src="/assets/images/storyset/404.png" alt="" width={250} height={250} />

        <Box mt={3}>
          <Typography variant="h2" fontWeight={700} color="error" gutterBottom>
            404 - Page Not Found
          </Typography>

          <Typography variant="h6" gutterBottom>
            The page you are looking for does not exist or might have been moved.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            maxWidth={480}
            mb={3}
          >
            It seems you have hit a broken link or entered an invalid address. You
            can go back to the previous page or return to the homepage.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
