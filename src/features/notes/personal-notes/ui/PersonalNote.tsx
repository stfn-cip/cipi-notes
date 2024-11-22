import NoteBase, {
  NoteDescription,
  NoteHeader,
  NoteTitle,
} from "@/features/notes/ui/NoteBase";
import { PersonalNoteTypes } from "../../types";
import PersonalNoteDropdown from "./PersonalNoteDropdown";

function PersonalNote({ note }: { note: PersonalNoteTypes }) {
  const { id, title, content } = note;

  return (
    <NoteBase className="flex-row items-start gap-1 p-6" /*href={`/${id}`}*/>
      <NoteHeader className="p-0">
        <NoteTitle>{title}</NoteTitle>
        <NoteDescription>{content}</NoteDescription>
      </NoteHeader>

      <PersonalNoteDropdown id={id} />
    </NoteBase>
  );
}
export default PersonalNote;
