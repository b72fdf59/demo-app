import type { NextPage } from "next";
import { useRouter } from "next/router";
import getConfig from "next/config";
import Head from "next/head";

import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import Logo from "../components/logo";

const styles = {
  textField: {
    marginBottom: 3,
    width: "100%",
    backgroundColor: "common.white",
    height: "46px",
    "& input": {
      height: "9px",
    },
    "& label": {
      color: "#ABABAB",
      top: "-5px",
    },
    autoCapitalize: "none",
    autoCorrect: "off",
  },
};

const Login: NextPage = () => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const { control, handleSubmit } =
    useForm<{ username: string; password: string }>();

  const onSubmit = handleSubmit(async (data) => {
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch("/api/login", options);
    const respJSON = await response.json();

    // Store response in local storage
    if (typeof publicRuntimeConfig.jwtTokenKey === "string") {
      localStorage.setItem(
        publicRuntimeConfig.jwtTokenKey,
        respJSON.accessToken
      );
    }
    router.push("/home");
  });

  return (
    <>
      <Head>
        <title> Finverse Demo App </title>
      </Head>
      <Container maxWidth="lg">
        <Logo />
        <Box component="form" noValidate onSubmit={onSubmit}>
          <Box
            sx={{
              maxWidth: "60%",
              margin: "auto",
            }}
          >
            <Controller
              control={control}
              name="username"
              defaultValue=""
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  autoFocus
                  variant="outlined"
                  type="email"
                  error={!!error}
                  helperText={error && "This field is required"}
                  sx={styles.textField}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              defaultValue=""
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  variant="outlined"
                  type="password"
                  helperText={error && "This field is required"}
                  sx={styles.textField}
                />
              )}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
