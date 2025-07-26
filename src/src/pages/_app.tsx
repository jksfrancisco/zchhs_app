import AppLoader from "@/libs/components/Loader";
import MiniDrawer from "@/libs/components/MiniDrawer";
import { getTheme } from "@/libs/components/theme";
import { useThemeStore } from "@/libs/stores/useThemeStore";
import { fetcher } from "@/libs/swr/fetcher";
import "@/styles/globals.css";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);
  const router = useRouter();

  const publicRoutes = ["/login", "/register", "/"];
  const isPublicRoute = publicRoutes.includes(router.pathname);

  const [authChecked, setAuthChecked] = useState(isPublicRoute);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/users", {
          credentials: "include",
        });
        
        if (res.ok) {
          if (isPublicRoute) {
            router.replace("/dashboard");
          } else {
            setAuthChecked(true);
          }
        } else {
          // Not logged in
          if (!isPublicRoute) {
            router.replace("/login");
          } else {
            setAuthChecked(true);
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (!isPublicRoute) {
          router.replace("/login");
        } else {
          setAuthChecked(true);
        }
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  if (!authChecked) return <AppLoader/>;
  
  const isNoDrawer = publicRoutes.includes(router.pathname);

  return (
    <>
      <Head>
        <title>Student Profile System | ZCHHS</title>
        <meta name="description" content="Student and teacher management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/images/zchhs.png" />
      </Head>

      <SWRConfig value={{ fetcher }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isNoDrawer ? (
            <Box sx={{ height: "100%", width: "100%", position: "absolute" }}>
              <Component {...pageProps} />
            </Box>
          ) : (
            <MiniDrawer>
              <Component {...pageProps} />
            </MiniDrawer>
          )}
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}
