import type { NextPage } from "next";
import Head from "next/head";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Root } from "../components/containers";
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
      <Root>
        <Logo />
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
          label="User ID"
          type="password"
          variant="outlined"
          sx={styles.textField}
        />
        <Button fullWidth variant="contained" color="primary" type="submit">
          Login
        </Button>
      </Root>
    </>
  );
};

export default Login;
