import NoteBase, {
  NoteDescription,
  NoteHeader,
  NoteTitle,
} from "@/features/notes/ui/NoteBase";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis } from "lucide-react";

export type PersonalNoteTypes = {
  title: string;
  content: string;
  link: string;
};

function PersonalNote({ note }: { note: PersonalNoteTypes }) {
  const { title, content, link } = note;

  return (
    <NoteBase href={link}>
      <div className="flex items-start gap-1 p-6">
        <NoteHeader className="p-0">
          <NoteTitle>{title}</NoteTitle>
          <NoteDescription>{content}</NoteDescription>
        </NoteHeader>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </NoteBase>
  );
}
export default PersonalNote;
