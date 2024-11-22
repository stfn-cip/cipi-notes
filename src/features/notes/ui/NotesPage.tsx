import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReusableTypes } from "@/lib/types";
import { cn } from "@/utils/utils";
import { ComponentPropsWithoutRef } from "react";

function NotesPage({
  children,
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"main">) {
  return (
    <main {...props} className={cn("", className)}>
      {children}
    </main>
  );
}

const PageHeader = ({
  children,
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "sticky top-0 mb-3 flex justify-between pb-2 pt-4 backdrop-blur-sm",
        className,
      )}
    >
      <SidebarTrigger />
      {children}
    </div>
  );
};

const PageGrid = ({
  children,
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"article">) => {
  return (
    <article
      {...props}
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(250px,_1fr))] justify-around gap-3 md:grid-cols-[repeat(auto-fit,minmax(300px,_1fr))]",
        className,
      )}
    >
      {children}
    </article>
  );
};

export { PageHeader, PageGrid };
export default NotesPage;
