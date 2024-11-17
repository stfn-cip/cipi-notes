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
    <NoteBase /*href={`/${id}`}*/>
      <div className="flex items-start justify-between gap-1 p-6">
        <NoteHeader className="p-0">
          <NoteTitle>{title}</NoteTitle>
          <NoteDescription>{content}</NoteDescription>
        </NoteHeader>

        <PersonalNoteDropdown id={id} />
      </div>
    </NoteBase>
  );
}
export default PersonalNote;
