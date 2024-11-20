import { Button } from "@/components/ui/button";
import Note, { FeedNoteTypes } from "@/features/notes/feed-notes/ui/Note";
import Page, { PageGrid, PageHeader } from "@/features/notes/ui/Page";

const notes: FeedNoteTypes[] = [
  {
    title: "Daily Motivation",
    content: "Believe in yourself! Every small step counts.",
    color: "rgba(255, 215, 0, 0.5)", // Gold with transparency
    link: "#",
    author: "Alice Johnson",
    publishedDate: "2024-11-08T08:00:00.000Z",
  },
  {
    title: "Quick Recipe",
    content: "Avocado toast: mash, season, and spread on toast. Enjoy!",
    color: "rgba(255, 140, 0, 0.5)", // Dark Orange with transparency
    link: "#",
    author: "Michael Chen",
    publishedDate: "2024-06-15T10:45:00.000Z",
  },
  {
    title: "Pro Tip",
    content: "Organize your workspace every morning for a productive day.",
    color: "rgba(30, 144, 255, 0.5)", // Dodger Blue with transparency
    link: "#",
    author: "Rachel Lee",
    publishedDate: "2024-08-05T09:00:00.000Z",
  },
  {
    title: "Did You Know?",
    content: "Bananas are berries, but strawberries aren’t.",
    color: "rgba(218, 112, 214, 0.5)", // Orchid with transparency
    link: "#",
    author: "Daniel Garcia",
    publishedDate: "2024-05-22T14:20:00.000Z",
  },
  {
    title: "Fitness Reminder",
    content: "Try a quick 10-minute stretch today!",
    color: "rgba(60, 179, 113, 0.5)", // Medium Sea Green with transparency
    link: "#",
    author: "Emily Nguyen",
    publishedDate: "2024-06-01T11:10:00.000Z",
  },
  {
    title: "Mindful Thought",
    content: "Pause and take three deep breaths whenever you feel stressed.",
    color: "rgba(32, 178, 170, 0.5)", // Light Sea Green with transparency
    link: "#",
    author: "James Patel",
    publishedDate: "2024-04-18T13:50:00.000Z",
  },
  {
    title: "Book Suggestion",
    content: "Atomic Habits by James Clear - A guide to building good habits.",
    color: "rgba(106, 90, 205, 0.5)", // Slate Blue with transparency
    link: "#",
    author: "Sophia Martinez",
    publishedDate: "2024-07-01T09:30:00.000Z",
  },
  {
    title: "Joke of the Day",
    content:
      "Why did the scarecrow win an award? He was outstanding in his field!",
    color: "rgba(255, 99, 71, 0.5)", // Tomato with transparency
    link: "#",
    author: "David Brown",
    publishedDate: "2024-06-25T08:05:00.000Z",
  },
  {
    title: "Goal of the Day",
    content: "Write down three things you’re grateful for.",
    color: "rgba(255, 215, 0, 0.5)", // Gold with transparency
    link: "#",
    author: "Isabella Wright",
    publishedDate: "2024-06-10T11:15:00.000Z",
  },
  {
    title: "Travel Dream",
    content: "One day, I’ll see the Northern Lights in Iceland!",
    color: "rgba(255, 140, 0, 0.5)", // Dark Orange with transparency
    link: "#",
    author: "Lucas Anderson",
    publishedDate: "2024-04-14T17:30:00.000Z",
  },
  {
    title: "Life Hack",
    content: "Store leftover herbs in ice cube trays with olive oil.",
    color: "rgba(30, 144, 255, 0.5)", // Dodger Blue with transparency
    link: "#",
    author: "Chloe Simmons",
    publishedDate: "2024-05-02T15:00:00.000Z",
  },
  {
    title: "Self-Care",
    content: "Drink a glass of water first thing in the morning.",
    color: "rgba(32, 178, 170, 0.5)", // Light Sea Green with transparency
    link: "#",
    author: "Joshua Robinson",
    publishedDate: "2024-06-03T07:00:00.000Z",
  },
  {
    title: "Challenge",
    content: "Take a break from social media for one hour today.",
    color: "rgba(218, 112, 214, 0.5)", // Orchid with transparency
    link: "#",
    author: "Ava Thompson",
    publishedDate: "2024-07-08T12:10:00.000Z",
  },
  {
    title: "Photography Tip",
    content: "The best lighting is during golden hour: sunrise or sunset.",
    color: "rgba(106, 90, 205, 0.5)", // Slate Blue with transparency
    link: "#",
    author: "Henry Kim",
    publishedDate: "2024-06-28T18:45:00.000Z",
  },
  {
    title: "Fun Fact",
    content: "Honey never spoils. Archaeologists found 3,000-year-old honey!",
    color: "rgba(255, 99, 71, 0.5)", // Tomato with transparency
    link: "#",
    author: "Olivia Hernandez",
    publishedDate: "2024-04-27T09:50:00.000Z",
  },
  {
    title: "Simple Pleasure",
    content: "Go for a walk and enjoy the fresh air.",
    color: "rgba(60, 179, 113, 0.5)", // Medium Sea Green with transparency
    link: "#",
    author: "Ethan Lopez",
    publishedDate: "2024-05-20T10:20:00.000Z",
  },
];

function NotesFeed() {
  return (
    <Page>
      <PageHeader>
        <Button>Publish a note</Button>
      </PageHeader>

      <PageGrid>
        {notes.map((note) => (
          <Note key={note.title} note={note} />
        ))}
      </PageGrid>
    </Page>
  );
}
export default NotesFeed;
