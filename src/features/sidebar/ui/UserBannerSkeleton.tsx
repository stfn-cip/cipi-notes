import { SidebarFooter } from "@/components/ui/sidebar";

function UserBannerSkeleton() {
  return (
    <SidebarFooter className="w-full flex-row items-center justify-start">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="size-10 animate-pulse rounded-full bg-primary/10" />
        <div className="flex flex-col gap-1 overflow-hidden leading-none">
          <div className="h-4 w-32 animate-pulse rounded-full bg-primary/10" />
          <div className="h-3 w-14 animate-pulse rounded-full bg-primary/10" />
        </div>
      </div>
    </SidebarFooter>
  );
}
export default UserBannerSkeleton;
