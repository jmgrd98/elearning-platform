import Header from "@/components/Header";
import { UserProgressProvider } from "@/context/ProgressContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProgressProvider>
        <main className="w-full flex flex-col">
          <Header/>
          {children}
        </main>
      </UserProgressProvider>
    </QueryClientProvider>
  );
}
