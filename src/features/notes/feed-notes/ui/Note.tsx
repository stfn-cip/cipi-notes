import { intlFormatDistance, parseISO } from "date-fns";
import NoteBase, {
  NoteDescription,
  NoteDetails,
  NoteFooter,
  NoteHeader,
  NoteTitle,
} from "@/features/notes/ui/NoteBase";

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
  const formatDate = parseISO(publishedDate);
  const convertDate = intlFormatDistance(formatDate, Date.now(), {
    style: "short",
    locale: "en",
  });

  return (
    <NoteBase href={link} style={{ borderColor: color }}>
      <NoteHeader>
        <NoteTitle>{title}</NoteTitle>
        <NoteDescription>{content}</NoteDescription>
      </NoteHeader>
      <NoteFooter>
        <NoteDetails>{author}</NoteDetails>
        <NoteDetails>{convertDate}</NoteDetails>
      </NoteFooter>
    </NoteBase>
  );
}
export default FeedNote;
