import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export type NoteTypes = {
  header: string;
  content: string;
  link: string;
};

function Note({ note }: { note: NoteTypes }) {
  const { header, content, link } = note;

  return (
    <Link href={link}>
      <Card className="max-w-96 transition-colors hover:bg-muted">
        <CardHeader>
          <CardTitle>{header}</CardTitle>
          <CardDescription className="line-clamp-3">{content}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
export default Note;
