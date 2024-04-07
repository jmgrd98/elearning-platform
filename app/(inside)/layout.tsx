
import Header from "@/components/Header";
import { UserProgressProvider } from "@/context/ProgressContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProgressProvider>
      <html lang="en" suppressHydrationWarning>
          <body className="flex">
          <main className="w-full flex flex-col">
          <Header/>
            {children}
          </main>
        </body>
      </html>
    </UserProgressProvider>
  );
}
