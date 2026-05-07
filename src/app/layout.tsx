import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./ui/navbar";

export const metadata: Metadata = {
    title: "Quinn Fransen",
    description: "Quinn Fransen's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      {/* font-serif gives you the traditional document look, while font-sans uses the un-serifed variant */}
      <body
        className="font-serif antialiased"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
