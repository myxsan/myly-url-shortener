"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Box, Button, Typography } from "@mui/material";

import MobileMenu from "./mobile-menu";
import { useIsMounted } from "@/hooks/use-is-mounted";

const MainNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const isMounted = useIsMounted();

  const pages = [
    {
      label: "Link Generator",
      href: "/link-generator",
      active: pathname.includes("link-genrator"),
    },
    {
      label: "QR Generator",
      href: "/qr-generator",
      active: pathname.includes("qr-genrator"),
    },
    {
      label: "One Link",
      href: "/one-link",
      active: pathname.includes("one-link"),
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
        {pages.map(({ label, active, href }, i) => (
          <Button
            key={i}
            variant="text"
            sx={{ my: 2, mx: 1, color: "white", display: "block" }}
            onClick={() => router.push(href)}
            disableRipple
          >
            <Typography
              fontSize={14}
              color={active ? "#bdbdbd" : "white"}
              sx={{ ":hover": { color: "#bdbdbd" } }}
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
              <Button
                variant="text"
                sx={{ mr: 2, mx: 1, color: "white", display: "block" }}
                // onClick={() => router.push("/")}
                disableRipple
              >
                <Typography
                  fontSize={14}
                  fontFamily="monospace"
                  color={"#bdbdbd"}
                  sx={{ ":hover": { textDecoration: "underline" } }}
                  style={{ transition: "all 0.2s ease" }}
                  textTransform="none"
                >
                  Your Links
                </Typography>
              </Button>
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