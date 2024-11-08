import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReusableTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef } from "react";

function NoteBase({
  className,
  href,
  ...props
}: ReusableTypes &
  Required<Pick<LinkProps, "href">> &
  ComponentPropsWithoutRef<"div">) {
  return (
    <Link href={href} className="max-w-96">
      <Card
        {...props}
        className={cn(
          "flex h-full w-full flex-col justify-between transition-colors lg:hover:bg-muted",
          className,
        )}
      />
    </Link>
  );
}

const NoteHeader = ({
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"div">) => {
  return <CardHeader className={cn("", className)} {...props} />;
};

const NoteTitle = ({
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"div">) => {
  return <CardTitle className={cn("", className)} {...props} />;
};

const NoteDescription = ({
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"div">) => {
  return (
    <CardDescription className={cn("line-clamp-3", className)} {...props} />
  );
};

const NoteDetails = ({
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"div">) => {
  return <CardDescription className={cn("", className)} {...props} />;
};

const NoteFooter = ({
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"div">) => {
  return (
    <CardFooter
      className={cn("justify-between gap-2 font-medium", className)}
      {...props}
    />
  );
};

export { NoteHeader, NoteTitle, NoteDescription, NoteDetails, NoteFooter };
export default NoteBase;
