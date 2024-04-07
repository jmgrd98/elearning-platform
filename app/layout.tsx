import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Kreator",
  description: "eLearning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
          <body>
          <main className="w-full flex flex-col">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
