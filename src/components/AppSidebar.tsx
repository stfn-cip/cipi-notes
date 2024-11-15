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
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import UserBannerSkeleton from "./UserBannerSkeleton";
import { GetUserName } from "@/lib/utils";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN } from "@/lib/routes";

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
      <Suspense fallback={<UserBannerSkeleton />}>
        <UserBanner />
      </Suspense>
    </Sidebar>
  );
}
export default AppSidebar;

async function UserBanner() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log(error);
  //if (error) throw new Error();
  if (!user) return <UserBannerSkeleton />;

  const name = GetUserName(user);

  return (
    <SidebarFooter className="w-full flex-row items-center justify-between">
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="size-10">
          <AvatarImage src="/favicon.ico" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden leading-none">
          <h4 className="text-md overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </h4>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
            Free
          </p>
        </div>
      </div>
      <SignOut />
    </SidebarFooter>
  );
}

export const SignOut = () => {
  const HandleLogOut = async () => {
    "use server";
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) throw new Error();

    redirect(DEFAULT_LOGIN);
  };

  return (
    <form action={HandleLogOut}>
      <Button
        type="submit"
        variant="ghost"
        className="rounded-full p-2 text-red-500 hover:text-red-400"
      >
        <LogOut size={20} />
      </Button>
    </form>
  );
};
