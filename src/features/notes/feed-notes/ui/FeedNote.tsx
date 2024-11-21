import { intlFormatDistance } from "date-fns";
import NoteBase, {
  NoteDescription,
  NoteDetails,
  NoteFooter,
  NoteHeader,
  NoteTitle,
} from "@/features/notes/ui/NoteBase";
import { FeedNoteTypes } from "../../types";
import { createClient } from "@/lib/supabase/server";
import { CombineUserName } from "@/utils/utils";

async function FeedNote({ note }: { note: FeedNoteTypes }) {
  const { title, content, color, user_id, created_at } = note;

  const convertDate = intlFormatDistance(new Date(created_at), new Date(), {
    style: "short",
    locale: "en",
  });

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("first_name,last_name")
    .eq("id", user_id)
    .single();

  const userName = data ? CombineUserName(data) : "";

  return (
    <NoteBase style={{ borderColor: color }}>
      <NoteHeader>
        <NoteTitle>{title}</NoteTitle>
        <NoteDescription>{content}</NoteDescription>
      </NoteHeader>
      <NoteFooter>
        <NoteDetails>{userName}</NoteDetails>
        <NoteDetails>{convertDate}</NoteDetails>
      </NoteFooter>
    </NoteBase>
  );
}
export default FeedNote;
