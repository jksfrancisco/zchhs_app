// theme/index.ts
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    typography: {
      fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
    },
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: "rgb(98, 100, 167)", // Microsoft Teams Purple
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#8A8BD4", // Lighter Teams accent
              contrastText: "#ffffff",
            },
            background: {
              default: "#1B1A1F",
              paper: "#252423",
            },
            text: {
              primary: "#F3F2F1",
              secondary: "#C8C6C4",
            },
            divider: "#3B3A39",
            action: {
              hover: "#2A2A2A",
              selected: "#3B3A39",
            },
          }
        : {
            primary: {
              main: "rgb(52, 63, 99)", // Custom ChongHua Theme Purple
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#464775", // Teams dark purple
              contrastText: "#ffffff",
            },
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#252423",
              secondary: "#605E5C",
            },
            divider: "#E1DFDD",
          }),
    },
  });
