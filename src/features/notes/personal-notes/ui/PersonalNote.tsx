import NoteBase, {
  NoteDescription,
  NoteHeader,
  NoteTitle,
} from "@/features/notes/ui/NoteBase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { PersonalNoteTypes } from "../../types";

function PersonalNote({ note }: { note: PersonalNoteTypes }) {
  const { id, title, content } = note;

  return (
    <NoteBase href={`/${id}`}>
      <div className="flex items-start justify-between gap-1 p-6">
        <NoteHeader className="p-0">
          <NoteTitle>{title}</NoteTitle>
          <NoteDescription>{content}</NoteDescription>
        </NoteHeader>
        
        <Dropdown />
      </div>
    </NoteBase>
  );
}
export default PersonalNote;

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
