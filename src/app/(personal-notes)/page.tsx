import Note, {
  PersonalNoteTypes,
} from "@/features/notes/personal-notes/ui/Note";
import AddNote from "@/features/notes/personal-notes/ui/AddNote";
import Page, { PageGrid, PageHeader } from "@/features/notes/ui/Page";

const notes: PersonalNoteTypes[] = [
  {
    title: "Scriptify",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, molestias veniam. Cupiditate ratione, doloremque nesciunt laudantium quas, dicta accusamus voluptate amet reiciendis a dolorem eius, praesentium quaerat ducimus non aliquam!",
    link: "#",
  },
  {
    title: "TaskMaster",
    content:
      "Easily manage and track your to-do lists with customizable features. TaskMaster simplifies productivity with reminders, priorities, and seamless collaboration.",
    link: "#",
  },
  {
    title: "QuickDocs",
    content:
      "Streamline document sharing and editing with a simple, intuitive interface. QuickDocs offers real-time collaboration and version control, perfect for teams.",
    link: "#",
  },
  {
    title: "FitTrack",
    content:
      "Keep your fitness journey on track with FitTrack. From workout routines to meal planning, everything is designed to help you achieve your health goals.",
    link: "#",
  },
  {
    title: "BudgetWise",
    content:
      "Manage your finances efficiently with BudgetWise. Track expenses, set savings goals, and stay on top of your spending habits with ease.",
    link: "#",
  },
  {
    title: "MindSpace",
    content:
      "Your personal journaling and mindfulness app. Reflect, set goals, and build a consistent habit of mental well-being with guided prompts and daily logs.",
    link: "#",
  },
  {
    title: "TravelMate",
    content:
      "Plan your adventures with TravelMate. From itineraries to travel tips, make every trip smooth and memorable. Discover new places and track your experiences.",
    link: "#",
  },
] as const;

export default function Home() {
  return (
    <Page>
      <PageHeader>
        <AddNote />
      </PageHeader>

      <PageGrid>
        {notes.map((note) => (
          <Note key={note.title} note={note} />
        ))}
      </PageGrid>
    </Page>
  );
}
