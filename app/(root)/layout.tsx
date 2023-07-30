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
      <Navbar />
      <Box minHeight="90vh" m={2}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
