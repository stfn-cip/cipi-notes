import { Button } from "@/components/ui/button";
import Note, { FeedNoteTypes } from "@/features/feed-notes/components/note";

const notes: FeedNoteTypes[] = [
  {
    title: "Daily Motivation",
    content: "Believe in yourself! Every small step counts.",
    color: "#FFD700",
    link: "#",
    author: "Alice Johnson",
    publishedDate: "2024-07-12T08:30:00.000Z",
  },
  {
    title: "Quick Recipe",
    content: "Avocado toast: mash, season, and spread on toast. Enjoy!",
    color: "#FF8C00",
    link: "#",
    author: "Michael Chen",
    publishedDate: "2024-06-15T10:45:00.000Z",
  },
  {
    title: "Pro Tip",
    content: "Organize your workspace every morning for a productive day.",
    color: "#1E90FF",
    link: "#",
    author: "Rachel Lee",
    publishedDate: "2024-08-05T09:00:00.000Z",
  },
  {
    title: "Did You Know?",
    content: "Bananas are berries, but strawberries aren’t.",
    color: "#DA70D6",
    link: "#",
    author: "Daniel Garcia",
    publishedDate: "2024-05-22T14:20:00.000Z",
  },
  {
    title: "Fitness Reminder",
    content: "Try a quick 10-minute stretch today!",
    color: "#3CB371",
    link: "#",
    author: "Emily Nguyen",
    publishedDate: "2024-06-01T11:10:00.000Z",
  },
  {
    title: "Mindful Thought",
    content: "Pause and take three deep breaths whenever you feel stressed.",
    color: "#20B2AA",
    link: "#",
    author: "James Patel",
    publishedDate: "2024-04-18T13:50:00.000Z",
  },
  {
    title: "Book Suggestion",
    content: "Atomic Habits by James Clear - A guide to building good habits.",
    color: "#6A5ACD",
    link: "#",
    author: "Sophia Martinez",
    publishedDate: "2024-07-01T09:30:00.000Z",
  },
  {
    title: "Joke of the Day",
    content:
      "Why did the scarecrow win an award? He was outstanding in his field!",
    color: "#FF6347",
    link: "#",
    author: "David Brown",
    publishedDate: "2024-06-25T08:05:00.000Z",
  },
  {
    title: "Goal of the Day",
    content: "Write down three things you’re grateful for.",
    color: "#FFD700",
    link: "#",
    author: "Isabella Wright",
    publishedDate: "2024-06-10T11:15:00.000Z",
  },
  {
    title: "Travel Dream",
    content: "One day, I’ll see the Northern Lights in Iceland!",
    color: "#FF8C00",
    link: "#",
    author: "Lucas Anderson",
    publishedDate: "2024-04-14T17:30:00.000Z",
  },
  {
    title: "Life Hack",
    content: "Store leftover herbs in ice cube trays with olive oil.",
    color: "#1E90FF",
    link: "#",
    author: "Chloe Simmons",
    publishedDate: "2024-05-02T15:00:00.000Z",
  },
  {
    title: "Self-Care",
    content: "Drink a glass of water first thing in the morning.",
    color: "#20B2AA",
    link: "#",
    author: "Joshua Robinson",
    publishedDate: "2024-06-03T07:00:00.000Z",
  },
  {
    title: "Challenge",
    content: "Take a break from social media for one hour today.",
    color: "#DA70D6",
    link: "#",
    author: "Ava Thompson",
    publishedDate: "2024-07-08T12:10:00.000Z",
  },
  {
    title: "Photography Tip",
    content: "The best lighting is during golden hour: sunrise or sunset.",
    color: "#6A5ACD",
    link: "#",
    author: "Henry Kim",
    publishedDate: "2024-06-28T18:45:00.000Z",
  },
  {
    title: "Fun Fact",
    content: "Honey never spoils. Archaeologists found 3,000-year-old honey!",
    color: "#FF6347",
    link: "#",
    author: "Olivia Hernandez",
    publishedDate: "2024-04-27T09:50:00.000Z",
  },
  {
    title: "Simple Pleasure",
    content: "Go for a walk and enjoy the fresh air.",
    color: "#3CB371",
    link: "#",
    author: "Ethan Lopez",
    publishedDate: "2024-05-20T10:20:00.000Z",
  },
];

function NotesFeed() {
  return (
    <main>
      <div className="mb-3 flex justify-end">
        <Button>Publish a note</Button> {/* <AddNote /> */}
      </div>
      <article className="grid grid-cols-[repeat(auto-fit,minmax(200px,_384px))] justify-center gap-3 md:grid-cols-[repeat(auto-fit,minmax(300px,_1fr))]">
        {notes.map((note) => (
          <Note key={note.title} note={note} />
        ))}
      </article>
    </main>
  );
}
export default NotesFeed;
