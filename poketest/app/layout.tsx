import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import { Topbar } from "@/components/Topbar/Topbar";
import { ApolloWrapper } from "@/lib/apollo/apollo-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poketest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JotaiProvider>
          <ApolloWrapper>
            {/* this div could be a global layout */}
            <Topbar />
            <div className="flex flex-col min-h-screen justify-center items-center">
              {children}
            </div>
          </ApolloWrapper>
        </JotaiProvider>
      </body>
    </html>
  );
}
