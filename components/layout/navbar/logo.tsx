import { Box, Typography } from "@mui/material";
import { Link } from "@mui/icons-material";

const Logo = () => {
  return (
    <Box display="flex" mr={2}>
      <Link sx={{ mr: "0.3rem", fontSize: 35, rotate: "90deg" }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { md: "flex" },
          fontWeight: 700,
          letterSpacing: ".15rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        MYLY
      </Typography>
    </Box>
  );
};

export default Logo;
