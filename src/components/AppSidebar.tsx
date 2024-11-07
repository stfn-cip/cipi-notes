import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Globe2, Settings2, NotepadText, Notebook, LogOut } from "lucide-react";
import { Button } from "./ui/button";

function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="flex flex-row items-center gap-1">
        <Notebook /> <h3 className="text-xl font-semibold">Cipi Notes</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <NotepadText />
                  <span>Personal Notes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/notes-feed">
                  <Globe2 />
                  <span>Notes Feed</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Settings2 />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <UserBanner />
    </Sidebar>
  );
}
export default AppSidebar;

function UserBanner() {
  return (
    <SidebarFooter className="flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage src="/favicon.ico" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <div className="leading-none">
          <h4 className="text-md">Ciprian Stefan</h4>
          <p className="text-sm text-muted-foreground">Free</p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="rounded-full p-2 text-red-500 hover:text-red-400"
      >
        <LogOut size={20} />
      </Button>
    </SidebarFooter>
  );
}
