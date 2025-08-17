"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Image from "next/image";
import { useRouter } from "next/router";
import { useThemeStore } from "@/libs/stores/useThemeStore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";

const Login = () => {
  const theme = useTheme();
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      const getCookie = (name: string) => {
        const match = document.cookie.match(
          new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? decodeURIComponent(match[2]) : null;
      };

      const xsrfToken = getCookie("XSRF-TOKEN");

      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken || "",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
        toast.success("Logged in successfully!");
      } else {
        console.error("Login failed:", data.message);
        setError(true);
        setIsLoading(false);
        setErrorMessage("Invalid email or password.");
        setTimeout(() => {
          setError(false);
          setErrorMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError(true);
      setIsLoading(false);
      setErrorMessage("Network error. Please try again.");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100%", position: "relative" }}
    >
      {/* 🔘 Dark Mode Toggle (Top-Right) */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon color="primary" />
          )}
        </IconButton>
      </Box>

      {/* Left Panel */}
      {!isMobile && (
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            background:
              mode === "dark"
                ? "linear-gradient(135deg, rgb(30,33,45), rgb(52,63,100))"
                : "linear-gradient(135deg, rgb(228, 230, 236), rgb(220, 222, 231))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "primary",
          }}
        >
          <Image
            src="/assets/images/zchhs.png"
            alt="ZCHHS Logo"
            width={120}
            height={120}
          />
          <Typography
            variant="h3"
            sx={{ mt: 4, fontWeight: 600, color: "primary" }}
          >
            ZCHHS Portal
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 2, maxWidth: 400, textAlign: "center", color: "primary" }}
          >
            Access your student profile, classes, and more — all in one place.
          </Typography>
          <Box>
            <Image
              src="/assets/images/storyset/student.png"
              alt="Illustration"
              width={230}
              height={230}
            />
          </Box>
        </Grid>
      )}

      {/* Right Panel */}
      <Grid
        size={{ xs: 12, md: 6 }}
        component={Paper}
        square
        sx={{
          background: mode === "dark" ? "rgb(30,33,45)" : "#fff",
          color: mode === "dark" ? "#fff" : "inherit",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mx: 4,
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
          }}
        >
          {isMobile && (
            <>
              <Image
                src="/assets/images/zchhs.png"
                alt="ZCHHS Logo"
                width={100}
                height={100}
              />
              <Typography
                variant="h3"
                sx={{ mt: 2, fontWeight: 600, color: "primary" }}
                gutterBottom
              >
                ZCHHS Portal
              </Typography>
            </>
          )}

          <Typography component="h6" variant="h5" sx={{ mb: 2 }}>
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit} style={{ marginTop: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={error}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              error={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              startIcon={
                isLoading && <CircularProgress color="secondary" size={20} />
              }
              sx={{ mt: 3, mb: 2, p: 2, fontSize: "16px" }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Box>
      </Grid>

      <Typography
        variant="body1"
        sx={{ position: "absolute", bottom: 10, right: 20 }}
      >
        v{process.env.NEXT_PUBLIC_APP_VERSION}
      </Typography>
    </Grid>
  );
};

export default Login;
