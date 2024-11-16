import { Button } from "@/components/ui/button";
import Note from "@/features/notes/feed-notes/ui/Note";
import NoNotes from "@/features/notes/ui/NoNotes";
import Page, { PageGrid, PageHeader } from "@/features/notes/ui/Page";
import SkeletonGrid from "@/features/notes/ui/Skeleton";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function NotesFeed() {
  return (
    <Page>
      <PageHeader>
        <Button>Publish a note</Button>
      </PageHeader>

      <Suspense fallback={<SkeletonGrid />}>
        <NotesGrid />
      </Suspense>
    </Page>
  );
}
export default NotesFeed;

const NotesGrid = async () => {
  const supabase = await createClient();
  const { data: notes, error } = await supabase
    .from("global-notes")
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
