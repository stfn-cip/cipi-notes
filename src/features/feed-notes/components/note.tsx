import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { intlFormatDistance } from "date-fns"

export type FeedNoteTypes = {
  title: string;
  content: string;
  link: string;
  color: string;
  author: string;
  publishedDate: string;
};

function FeedNote({ note }: { note: FeedNoteTypes }) {
  const { title, content, link, color, author, publishedDate } = note;
  const formatDate = intlFormatDistance(new Date(publishedDate), new Date(), { style: "short", locale: "en", unit: "month" });

  return (
    <Link href={link}>
      <Card
        style={{ borderColor: color }}
        className="flex h-full w-full max-w-96 flex-col justify-between transition-colors lg:hover:bg-muted"
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-3">{content}</CardDescription>
        </CardHeader>

        <CardFooter className="justify-between font-medium">
          <CardDescription>{author}</CardDescription>
          <CardDescription>{formatDate}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
export default FeedNote;
