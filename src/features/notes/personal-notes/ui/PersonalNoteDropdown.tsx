"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { deleteNote } from "../actions";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";

const PersonalNoteDropdown = ({ id }: { id: string }) => {
  const onDelete = async () => {
    const error = await deleteNote(id);

    if (error) {
      toast("An error occured!");
      return;
    }
    toast("Note deleted!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-red-500">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PersonalNoteDropdown;
