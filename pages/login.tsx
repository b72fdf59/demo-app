import { Ref } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";

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
  const { control, handleSubmit } =
    useForm<{ username: string; password: string }>();

  const onSubmit = handleSubmit((data) => {
    console.log("submit");
    console.log(data);
  });

  // Handles the submit event on form submit.
  // const onSubmit = (data: any) => {
  //   // Stop the form from submitting and refreshing the page.

  //   // Get data from the form.
  //   const data = {
  //     first: event.target.first.value,
  //     last: event.target.last.value,
  //   };

  //   // Send the data to the server in JSON format.
  //   const JSONdata = JSON.stringify(data);

  //   // API endpoint where we send form data.
  //   const endpoint = "/api/form";

  //   // Form the request for sending data to the server.
  //   const options = {
  //     // The method is POST because we are sending data.
  //     method: "POST",
  //     // Tell the server we're sending JSON.
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // Body of the request is the JSON data we created above.
  //     body: JSONdata,
  //   };

  //   // Send the form data to our forms API on Vercel and get a response.
  //   const response = await fetch(endpoint, options);

  //   // Get the response data from server as JSON.
  //   // If server returns the name submitted, that means the form works.
  //   const result = await response.json();
  //   alert(`Is this your full name: ${result.data}`);
  // };

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
