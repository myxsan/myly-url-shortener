import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box display="flex" flexGrow={1}>
        <Box width="100%" zIndex={100} position="fixed" top={0}>
          <Navbar />
        </Box>
      </Box>
      <Box minHeight="65vh" mx={{ xs: 0, md: 40 }} my={{ xs: 1, md: 15 }}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
