import type { NextPage } from "next";
import Head from "next/head";

import Container from "@mui/material/Container";

type Props = {
  authorized: boolean;
};

const Home: NextPage<Props> = ({ authorized }: Props) => {
  return (
    <>
      <Head>
        <title> Finverse Demo App </title>
      </Head>
      <Container maxWidth="lg">
        <h1> {authorized ? "Authed" : "Not Authed"} </h1>
      </Container>
    </>
  );
};

export default Home;
