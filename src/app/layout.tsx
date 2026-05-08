import type { Metadata } from "next";
import { Lato } from "next/font/google";import "./globals.css";
import Navbar from "./ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";


// Configure Lato font
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], // Add the weights you plan to use
  variable: "--font-lato",
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
