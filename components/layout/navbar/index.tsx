import { AppBar, Box, Container, CssBaseline, Toolbar } from "@mui/material";

import Logo from "@/components/layout/navbar/logo";
import MainNav from "./main-nav";

const Navbar = () => {
  return (
    <Box width="100%">
      <CssBaseline />
      <AppBar
        color="inherit"
        sx={{
          bgcolor: "black",
          boxShadow: 7,
        }}
      >
        <Container>
          <Toolbar disableGutters>
            <Logo />
            <MainNav />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Navbar;
