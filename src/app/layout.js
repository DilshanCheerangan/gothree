import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "GoThree | Move With Purpose",
  description: "Hands-on internships designed for real-world impact.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-brand-accent selection:text-brand-deep`}
    >
      <body className="min-h-screen bg-brand-deep text-brand-white flex flex-col relative overflow-x-hidden">
        <Navbar />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
