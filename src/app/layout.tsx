import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "TedPrime — Software, SaaS & IT Infrastructure for Government & Enterprise",
  description:
    "TedPrime designs, builds, and operates software systems, SaaS platforms, and IT infrastructure for government agencies, institutions, and enterprises across Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
