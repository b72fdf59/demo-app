import type { NextPage } from "next";
import Head from "next/head";

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
  return (
    <>
      <Head>
        <title> Finverse Demo App </title>
      </Head>
      <Container maxWidth="lg">
        <Logo />
        <Box
          sx={{
            maxWidth: "60%",
            margin: "auto",
          }}
        >
          <TextField
            id="username"
            label="User ID"
            variant="outlined"
            type="email"
            autoFocus
            sx={styles.textField}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            sx={styles.textField}
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
      </Container>
    </>
  );
};

export default Login;
