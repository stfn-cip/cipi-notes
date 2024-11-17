"use client";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import {
  Form as FormWrapper,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  insertNote,
  revalidatePathClient,
} from "@/features/notes/personal-notes/actions";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export const insertFormSchema = z.object({
  title: z.string().min(1).max(30),
  content: z.string().min(1).max(1000),
});

function AddNotesForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof insertFormSchema>>({
    resolver: zodResolver(insertFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof insertFormSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    const promise = insertNote(formData);

    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        revalidatePathClient("/");
        setOpen(false);
        return "Note added!";
      },
      error: "Error",
    });
  };

  return (
    <FormWrapper {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className="text-base" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="h-60 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DrawerFooter className="flex flex-row justify-end gap-2 px-0 pt-3">
          <Button type="submit">Upload</Button>
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </FormWrapper>
  );
}

export default AddNotesForm;
