import { Button } from "@/components/ui/button";
import Note from "@/features/notes/feed-notes/ui/FeedNote";
import NoNotes from "@/features/notes/ui/NoNotesMessage";
import NotesPage, { PageGrid, PageHeader } from "@/features/notes/ui/NotesPage";
import NotesSkeletonGrid from "@/features/notes/ui/NotesSkeletonGrid";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function NotesFeed() {
  return (
    <NotesPage>
      <PageHeader>
        <Button>Publish a note</Button>
      </PageHeader>

      <Suspense fallback={<NotesSkeletonGrid />}>
        <NotesGrid />
      </Suspense>
    </NotesPage>
  );
}
export default NotesFeed;

const NotesGrid = async () => {
  const supabase = await createClient();
  const { data: notes, error } = await supabase
    .from("global_notes")
    .select()
    .order("created_at", { ascending: false });

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
