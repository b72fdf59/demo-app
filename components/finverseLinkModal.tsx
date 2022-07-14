import { Box, Fade, Modal, SxProps, Theme, useTheme } from "@mui/material";

const styles = {
  container: {
    overflow: "hidden auto",
    width: 1,
    height: 1,
    display: "flex",
    placeContent: "center",
    placeItems: "center",
  },
  containerDesktop: {
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  linkBase: {
    margin: "auto",
  },
  linkDesktop: {
    overflow: "hidden",
    minHeight: 500,
    height: 1,
    maxHeight: 700,
    width: 428,
    minWidth: 428,
    borderRadius: 1,
    boxShadow: "shadows.5",
  },
  linkMobile: {
    height: 1,
    width: 1,
  },
};

type Props = {
  url: string;
  linkOpen: boolean;
  handleClose: () => void;
};

export default function LinkModal({
  url,
  linkOpen,
  handleClose,
}: Props): JSX.Element {
  const theme = useTheme();
  const isMobile = theme.breakpoints.up("sm");
  const isPortrait = window.innerWidth > window.innerHeight ? false : true;

  const containerSx: SxProps<Theme> = {
    ...styles.container,
    ...(isMobile && isPortrait && styles.containerDesktop),
  };
  const linkSx: SxProps<Theme> = {
    ...styles.linkBase,
    ...(isMobile && isPortrait ? styles.linkMobile : styles.linkDesktop),
  };

  return (
    <Modal open={linkOpen} onClose={handleClose} closeAfterTransition>
      <Fade in={linkOpen}>
        <Box sx={containerSx}>
          <Box
            component="iframe"
            src={url}
            sx={[
              linkSx,
              {
                border: "none",
                display: "block",
                height: 1,
                width: 1,
                zoom: 1,
              },
            ]}
          />
        </Box>
      </Fade>
    </Modal>
  );
}
