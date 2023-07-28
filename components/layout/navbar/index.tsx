import { AppBar, Box, Container, CssBaseline, Toolbar } from "@mui/material";

import Logo from "@/components/layout/navbar/logo";
import MainNav from "./main-nav";

const Navbar = () => {
  return (
    <Box marginBottom={2} paddingX="auto">
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <CssBaseline />
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
