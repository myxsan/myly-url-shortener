"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Box, Button, Typography } from "@mui/material";

import MobileMenu from "./mobile-menu";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { theme } from "@/theme";

const MainNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const isMounted = useIsMounted();

  const pages = [
    {
      label: "Short Link",
      href: "/sl",
      active: pathname.includes("link-genrator"),
    },
    {
      label: "QR",
      href: "/qr",
      active: pathname.includes("qr-genrator"),
    },
  ];

  if (!isMounted) return null;

  return (
    <Box
      display="flex"
      flexGrow={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {pages.map(({ label, href }, i) => (
          <Button
            key={i}
            variant="text"
            sx={{
              my: 2,
              mx: 1,
              display: "block",
              ":hover": { backgroundColor: "unset" },
            }}
            onClick={() => router.push(href)}
            disableRipple
          >
            <Typography
              fontSize={14}
              color="white"
              sx={{ ":hover": { color: theme.palette.neutral.main } }}
              style={{ transition: "all 0.2s ease" }}
            >
              {label}
            </Typography>
          </Button>
        ))}
      </Box>
      <Box display="flex" alignItems="center" flexGrow={1} justifyContent="end">
        <Box
          display={{ xs: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          {userId ? (
            <>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                variant="text"
                color="inherit"
                sx={{
                  marginX: 1,
                  textTransform: "unset",
                  ":hover": { opacity: "80%" },
                  transition: "all 0.2s ease",
                }}
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  marginX: 1,
                  textTransform: "unset",
                  ":hover": { opacity: "80%" },
                  transition: "all 0.2s ease",
                }}
                onClick={() => router.push("/sign-up")}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
        <MobileMenu uid={userId} pages={pages} />
      </Box>
    </Box>
  );
};

export default MainNav;
