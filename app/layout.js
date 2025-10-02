import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sahayak",
  description: "Helping hands",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
        <Navbar />
        
        {/* Background */}
        <div className="min-h-[84vh] relative h-full w-full bg-slate-950">
          {/* Page Content */}
          {children}
        </div>

        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
