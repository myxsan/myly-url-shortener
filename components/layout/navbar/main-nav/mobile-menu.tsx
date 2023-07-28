"use client";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

interface SideMenuProps {
  pages: { label: string; href: string; active: boolean }[];
  uid?: string | null;
}

const MobileMenu: React.FC<SideMenuProps> = ({ pages, uid }) => {
  const [menuState, setMenuState] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <Box display={{ xs: "flex", md: "none" }}>
        <IconButton
          size="large"
          onClick={() => setMenuState(true)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer
        anchor="right"
        open={menuState}
        onClose={() => setMenuState(false)}
      >
        <Box
          display="flex"
          height="100%"
          flexDirection="column"
          bgcolor="#0A0A0A"
        >
          <Box
            height="100%"
            width="220px"
            display="flex"
            flexDirection="row"
            paddingY={1}
            flexGrow={1}
            justifyContent="space-between"
            alignItems="flex-start"
            bgcolor="#0A0A0A"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              flexGrow={1}
              marginTop={1}
            >
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: "1",
                  mt: 3,
                }}
              >
                {pages.map(({ label, href }, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemButton onClick={() => router.push(href)}>
                      <ListItemText
                        primary={label}
                        style={{ color: "white" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Box display="flex" alignItems="start">
                <IconButton onClick={() => setMenuState(false)}>
                  <Close
                    sx={{
                      color: "white",
                      fontSize: "28px",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            marginY={3}
          >
            {uid ? (
              <>
                <Typography
                  fontSize={15}
                  marginRight={3}
                  fontFamily="monospace"
                  color={"#bdbdbd"}
                  textTransform="none"
                >
                  Your Links
                </Typography>
                <UserButton />
              </>
            ) : (
              <Box
                display="flex"
                alignItems="center"
                flexGrow={1}
                justifyContent="space-around"
              >
                <Button
                  variant="text"
                  sx={{
                    textTransform: "unset",
                    color: "#cccccc",
                  }}
                  onClick={() => router.push("/sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "unset",
                    color: "#cccccc",
                  }}
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
