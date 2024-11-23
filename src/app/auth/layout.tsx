import { Card } from "@/components/ui/card";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center">
      <Card className="w-[344px] space-y-3 gap-10 my-5 mx-2">{children}</Card>
    </main>
  );
}
export default RootLayout;
