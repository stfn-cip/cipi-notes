import Sidebar from "@/features/sidebar/ui/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="container mx-auto pb-4 pl-2 pr-2">{children}</div>
    </SidebarProvider>
  );
}
export default RootLayout;
