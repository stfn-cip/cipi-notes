"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Form from "@/features/notes/personal-notes/add-notes/ui/AddNotesForm";
import { useState } from "react";

function AddNote() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      handleOnly={true}
      direction="right"
      repositionInputs={true}
    >
      <DrawerTrigger asChild>
        <Button>New Note</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-full w-full overflow-auto rounded-2xl border bg-background px-4">
          <div className="max-w-xl">
            <DrawerHeader className="mb-3 px-0">
              <DrawerTitle className="text-xl">Add a new note</DrawerTitle>
            </DrawerHeader>
            <Form setOpen={setOpen} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
export default AddNote;
