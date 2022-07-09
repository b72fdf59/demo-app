import Image from "next/image";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const styles = {
  header: {
    minHeight: "20vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    position: "relative",
    width: "30%",
    paddingBottom: "20%",
  },
};

type Props = {
  title?: string;
  src?: string;
  subTitle?: string;
};

export default function Logo({
  title = "Demo App",
  subTitle,
  src = "/DEMO.svg",
}: Props): JSX.Element {
  return (
    <Box sx={styles.header}>
      <Box sx={styles.logo}>
        <Image src={src} layout="fill" alt="Logo image" objectFit="contain" />
      </Box>
      <Box>
        <Typography gutterBottom variant="h6" component="h6">
          {title}
        </Typography>
        <Typography gutterBottom variant="body1">
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
}
