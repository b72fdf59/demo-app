import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import getConfig from "next/config";
import { useRouter } from "next/router";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { theme } from "../theme";
import "../styles/globals.css";
import { checkToken } from "../utils/api/token";

const privatePages = ["/user"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [queryClient] = useState(() => new QueryClient());
  const [authorized, setAuthorized] = useState(false);

  const authCheck = async (url: string) => {
    const path = url.split("/")[0];
    try {
      if (privatePages.includes(path)) {
        if (typeof publicRuntimeConfig.jwtTokenKey === "string") {
          const token = localStorage.get(publicRuntimeConfig.jwtTokenKey);
          const queryFn = () => checkToken(token);
          const resp = await queryClient.fetchQuery("authenticate", queryFn);
          console.log(resp);
          setAuthorized(true);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
    setAuthorized(false);
    router.push("/login");
  };

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {authorized ? <Component {...pageProps} /> : <h1>Not Authed</h1>}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
