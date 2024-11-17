import { PageGrid } from "@/features/notes/ui/NotesPage";
import NoteBase from "./NoteBase";

function NotesSkeletonGrid() {
  return (
    <PageGrid>
      {Array.from({ length: 9 }).map((_, id) => (
        <NoteBase
          style={{ animationDelay: `${id * 100}ms` }}
          className="h-[156px] animate-pulse bg-primary/10"
          key={id}
        />
      ))}
    </PageGrid>
  );
}
export default NotesSkeletonGrid;
