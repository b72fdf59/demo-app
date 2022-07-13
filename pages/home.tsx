import type { NextPage } from "next";
import Head from "next/head";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Logo from "../components/logo";

type FlowCardProps = {
  title: string;
  description?: string;
  buttonLabel?: string;
  handleClick?: () => void;
};
const FlowCard = ({
  title,
  description,
  buttonLabel = "Submit",
  handleClick,
}: FlowCardProps): JSX.Element => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        pt: 4,
        pb: 4,
        width: "100%",
        maxWidth: 500,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      elevation={0}
    >
      <Box>
        <Typography
          align="center"
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "semi-bold" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {description}
        </Typography>
      </Box>
      <Button variant="contained" onClick={handleClick} disabled={!handleClick}>
        {buttonLabel}
      </Button>
    </Paper>
  );
};

type Props = {
  authorized: boolean;
};

const Home: NextPage<Props> = ({ authorized }: Props) => {
  return (
    <>
      <Head>
        <title> Finverse Demo App </title>
      </Head>
      <Box />
      <Container maxWidth="lg">
        <Logo sx={{ marginBottom: 3 }} />
        <Stack
          gap={2}
          direction="column"
          sx={{ alignItems: "center", marginTop: 2 }}
        >
          <FlowCard
            title="Data API"
            description="Link an account and access real-time financial data"
            buttonLabel="Link a bank account"
          />
        </Stack>
      </Container>
    </>
  );
};
export default Home;
