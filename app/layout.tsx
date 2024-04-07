import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Formando Creators",
  description: "eLearning platform",
  icons: {
    icon: '/icon.ico',  
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href={'/icon.ico'} />
        </head>
          <body>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
