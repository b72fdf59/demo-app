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
      <Image src={src} width={300} height={200} alt="Logo image" />
      <Box>
        <Typography variant="h6" component="h6">
          {title}
        </Typography>
        <Typography variant="body1">{subTitle}</Typography>
      </Box>
    </Box>
  );
}
