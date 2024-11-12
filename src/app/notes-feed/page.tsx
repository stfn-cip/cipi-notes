import { Button } from "@/components/ui/button";
import Note from "@/features/notes/feed-notes/ui/Note";
import NoNotes from "@/features/notes/ui/NoNotes";
import Page, { PageGrid, PageHeader } from "@/features/notes/ui/Page";
import { createClient } from "@/lib/supabase/server";

async function NotesFeed() {
  const supabase = createClient();
  const { data: notes } = await (await supabase).from("global-notes").select();

  return (
    <Page>
      <PageHeader>
        <Button>Publish a note</Button>
      </PageHeader>

      <PageGrid>
        {notes && notes.length != 0 ? (
          notes.map((note) => <Note key={note.id} note={note} />)
        ) : (
          <NoNotes />
        )}
      </PageGrid>
    </Page>
  );
}
export default NotesFeed;
