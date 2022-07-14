import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { theme } from "../theme";
import "../styles/globals.css";
import { checkToken } from "../utils/api/token";
import { JWTTokenKey } from "../utils/constants";

const publicPages = ["/login"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const [authorized, setAuthorized] = useState(false);

  const authCheck = async (url: string) => {
    if (publicPages.includes(url)) {
      setAuthorized(true);
      return;
    }
    const token = localStorage.getItem(JWTTokenKey);
    if (token === null) {
      setAuthorized(false);
      router.push("/login");
      return;
    }

    try {
      const resp = await queryClient.fetchQuery("authenticate", () =>
        checkToken(token)
      );
      console.log(resp);
      setAuthorized(true);
    } catch (err) {
      console.log(err);
      router.push("/login");
    }
  };

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {authorized && <Component {...pageProps} />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
