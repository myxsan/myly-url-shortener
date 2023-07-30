import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{ marginX: "auto" }}
        paddingY={4}
        borderTop={"1px solid"}
        borderColor={"rgba(12,12,12,0.5)"}
      >
        <Typography
          textAlign="center"
          color="gray"
          fontFamily="monospace"
          fontSize="small"
        >
          &copy; 2023 MYLY, Inc. All rights reserved.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
