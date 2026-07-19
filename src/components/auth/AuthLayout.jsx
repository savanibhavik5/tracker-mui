import backgrounds from "@/constants/backgrounds";
import { Box, CircularProgress, Container, Fade, Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function AuthLayout({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();

    image.src = backgrounds;

    image.onload = () => {
      setLoaded(true);
    };
  }, []);

  if (!loaded) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#101828",
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${backgrounds})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              p: 5,
              borderRadius: 4,
              background: "rgba(255,255,255,.82)",
              backdropFilter: "blur(14px)",
            }}
          >
            {children}
          </Paper>
        </Container>
      </Box>
    </Fade>
  );
}
