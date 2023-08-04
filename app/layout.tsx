import "./globals.css";
import { Urbanist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "MYLY Ling Generator",
  description: "Generate your links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body className={font.className}>{children}</body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
