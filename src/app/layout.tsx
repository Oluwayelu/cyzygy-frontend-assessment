import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RQProvider from "@/components/RQProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cyzygy Assessment",
  description: "This is a Cyzygy fullstack assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RQProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100`}
        >
          {children}
          <Toaster richColors />
        </body>
      </RQProvider>
    </html>
  );
}

