import Note from "@/features/notes/personal-notes/ui/Note";
import AddNote from "@/features/notes/personal-notes/add-notes/ui/AddNote";
import Page, { PageGrid, PageHeader } from "@/features/notes/ui/Page";
import { createClient } from "@/lib/supabase/server";
import NoNotes from "@/features/notes/ui/NoNotes";
import { Suspense } from "react";
import SkeletonGrid from "@/features/notes/ui/Skeleton";

export default function Home() {
  return (
    <Page>
      <PageHeader>
        <AddNote />
      </PageHeader>

      <Suspense fallback={<SkeletonGrid />}>
        <NotesGrid />
      </Suspense>
    </Page>
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
