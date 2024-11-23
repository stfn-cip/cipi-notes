import {
  Sidebar as SidebarWrapper,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Globe2, Settings2, NotepadText, Notebook } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import UserBannerSkeleton from "./UserBannerSkeleton";
import { CombineUserName } from "@/utils/utils";
import { SidebarSignOut } from "./SidebarSignOut";

function Sidebar() {
  return (
    <SidebarWrapper variant="floating">
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
              <SidebarMenuButton aria-disabled tabIndex={-1} asChild>
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
    </SidebarWrapper>
  );
}
export default Sidebar;

async function UserBanner() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error();
  if (!user) return <UserBannerSkeleton />;

  const name = user ? CombineUserName(user) : "";

  return (
    <SidebarFooter className="w-full flex-row items-center justify-between pl-3">
      <div className="flex items-center gap-2 overflow-hidden">
        {/* <Avatar className="size-10">
          <AvatarImage src="/favicon.ico" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar> */}
        <div className="flex flex-col overflow-hidden leading-none">
          <h4 className="text-md overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </h4>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
            Free
          </p>
        </div>
      </div>
      <SidebarSignOut />
    </SidebarFooter>
  );
}
