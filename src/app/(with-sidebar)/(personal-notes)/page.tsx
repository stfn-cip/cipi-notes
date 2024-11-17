import Note from "@/features/notes/personal-notes/ui/PersonalNote";
import AddNoteSheet from "@/features/notes/personal-notes/add-notes/ui/AddNoteSheet";
import NotesPage, { PageGrid, PageHeader } from "@/features/notes/ui/NotesPage";
import { createClient } from "@/lib/supabase/server";
import NoNotes from "@/features/notes/ui/NoNotesMessage";
import { Suspense } from "react";
import NotesSkeletonGrid from "@/features/notes/ui/NotesSkeletonGrid";

export default function Home() {
  return (
    <NotesPage>
      <PageHeader>
        <AddNoteSheet />
      </PageHeader>

      <Suspense fallback={<NotesSkeletonGrid />}>
        <NotesGrid />
      </Suspense>
    </NotesPage>
  );
}

const NotesGrid = async () => {
  const supabase = await createClient();
  const { data: notes, error } = await supabase
    .from("private-notes")
    .select()
    .order("updated_at", { ascending: false });

  if (error) throw new Error();

  return (
    <PageGrid>
      {notes && notes.length != 0 ? (
        notes.map((note) => <Note key={note.id} note={note} />)
      ) : (
        <NoNotes />
      )}
    </PageGrid>
  );
};
