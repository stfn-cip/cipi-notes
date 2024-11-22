import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReusableTypes } from "@/lib/types";
import { cn } from "@/utils/utils";
import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type BaseTypes = ReusableTypes &
  ComponentPropsWithoutRef<"div"> &
  Partial<Pick<LinkProps, "href">>;

function NoteBase({ href, ...props }: BaseTypes) {
  return href ? (
    <NoteLink href={href}>
      <NoteCard {...props} className="transition-colors lg:hover:bg-muted" />
    </NoteLink>
  ) : (
    <NoteCard {...props} />
  );
}

const NoteCard = ({
  className,
  ...props
}: ReusableTypes & ComponentPropsWithoutRef<"div">) => {
  return (
    <Card
      {...props}
      className={cn(
        "flex h-full w-full max-w-96 flex-col justify-between",
        className,
      )}
    />
  );
};

const NoteLink = ({ href, ...props }: LinkProps & { children: ReactNode }) => {
  return <Link {...props} href={href} className="max-w-96" />;
};

//note elements
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
