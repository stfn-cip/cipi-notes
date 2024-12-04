"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const uploadFeedNote = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from("global_notes").insert({
    title,
    content,
    user_id: user?.id,
    color: "rgba(255, 215, 0, 0.5)",
    generated_by_AI: true,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  revalidatePath("/");
};

export const generateFeedNoteAI = async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("global_notes")
    .select("title,content")
    .eq("generated_by_AI", true);

  const { object, finishReason } = await generateObject({
    model: google("gemini-1.5-pro-latest"),
    schema: z.object({
      title: z.string(),
      content: z.string(),
    }),
    system:
      "You generate notes. The output must be only the note. The note can be a friendly reminder, a friendly question, a friendly suggestion, a motivational message, a beautiful verse, a Did you know? note about something interesting, and much more! The title must have a maximum of 4-5 words, and the content a maximum of 30 words.",
    prompt: `List of your old notes: ${JSON.stringify(data)}.
      Generate a random unique friendly note.
      `,
  });

  if (finishReason == "stop") await uploadFeedNote(object);
  else throw new Error(finishReason);
};
