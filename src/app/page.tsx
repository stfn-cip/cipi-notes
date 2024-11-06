import Note, { NoteTypes } from "@/features/notes/components/note";
import AddNote from "@/features/notes/private-notes/components/addNote";

const notes: NoteTypes[] = [
  {
    header: "Scriptify",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, molestias veniam. Cupiditate ratione, doloremque nesciunt laudantium quas, dicta accusamus voluptate amet reiciendis a dolorem eius, praesentium quaerat ducimus non aliquam!",
    link: "#",
  },
  {
    header: "TaskMaster",
    content:
      "Easily manage and track your to-do lists with customizable features. TaskMaster simplifies productivity with reminders, priorities, and seamless collaboration.",
    link: "#",
  },
  {
    header: "QuickDocs",
    content:
      "Streamline document sharing and editing with a simple, intuitive interface. QuickDocs offers real-time collaboration and version control, perfect for teams.",
    link: "#",
  },
  {
    header: "FitTrack",
    content:
      "Keep your fitness journey on track with FitTrack. From workout routines to meal planning, everything is designed to help you achieve your health goals.",
    link: "#",
  },
  {
    header: "BudgetWise",
    content:
      "Manage your finances efficiently with BudgetWise. Track expenses, set savings goals, and stay on top of your spending habits with ease.",
    link: "#",
  },
  {
    header: "MindSpace",
    content:
      "Your personal journaling and mindfulness app. Reflect, set goals, and build a consistent habit of mental well-being with guided prompts and daily logs.",
    link: "#",
  },
  {
    header: "TravelMate",
    content:
      "Plan your adventures with TravelMate. From itineraries to travel tips, make every trip smooth and memorable. Discover new places and track your experiences.",
    link: "#",
  },
] as const;

export default function Home() {
  return (
    <main>
      <div className="flex justify-end mb-3">
        <AddNote />
      </div>
      <article className="grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] justify-around justify-items-center gap-3 md:grid-cols-[repeat(auto-fit,minmax(300px,_1fr))]">
        {notes.map((note) => (
          <Note key={note.header} note={note} />
        ))}
      </article>
    </main>
  );
}
