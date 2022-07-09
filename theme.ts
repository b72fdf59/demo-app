import blue from "@mui/material/colors/blue";
import red from "@mui/material/colors/red";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: red[500] },
  },
});
