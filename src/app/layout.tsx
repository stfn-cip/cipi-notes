import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Cipi Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="sticky top-4 m-4 mr-0 ml-1" />
          <div className="container mx-auto py-4 pr-4">{children}</div>
        </SidebarProvider>
      </body>
    </html>
  );
}
