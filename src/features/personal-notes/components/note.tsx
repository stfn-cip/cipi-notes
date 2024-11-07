import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export type PersonalNoteTypes = {
  title: string;
  content: string;
  link: string;
};

function PersonalNote({ note }: { note: PersonalNoteTypes }) {
  const { title, content, link } = note;

  return (
    <Link href={link}>
      <Card className="max-w-96 transition-colors lg:hover:bg-muted">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-3">{content}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
export default PersonalNote;
