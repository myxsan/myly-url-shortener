import Navbar from "@/components/layout/navbar";
import "./globals.css";
import { Urbanist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

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
      <html lang="en">
        <body
          className={font.className}
          style={{ backgroundColor: "#191919", color: "white" }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
