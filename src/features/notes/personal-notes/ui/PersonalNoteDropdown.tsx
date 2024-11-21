"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteNote, revalidatePathClient } from "../actions";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";

const PersonalNoteDropdown = ({ id }: { id: string }) => {
  const onDelete = async () => {
    const promise = deleteNote(id);

    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        revalidatePathClient("/");
        return "Note deleted!";
      },
      error: "Error",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="text-red-500 focus:text-red-400"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PersonalNoteDropdown;
