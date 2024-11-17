import { intlFormatDistance } from "date-fns";
import NoteBase, {
  NoteDescription,
  NoteDetails,
  NoteFooter,
  NoteHeader,
  NoteTitle,
} from "@/features/notes/ui/NoteBase";
import { FeedNoteTypes } from "../../types";

function FeedNote({ note }: { note: FeedNoteTypes }) {
  const { title, content, color, author, created_at } = note;

  const convertDate = intlFormatDistance(new Date(created_at), new Date(), {
    style: "short",
    locale: "en",
  });

  return (
    <NoteBase style={{ borderColor: color }}>
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
