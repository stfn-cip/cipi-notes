import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function AddNote() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>New Note</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl px-3">
          <DrawerHeader className="px-0 pb-5">
            <DrawerTitle className="text-3xl">Add a new note</DrawerTitle>
          </DrawerHeader>

          <form className="space-y-3">
            <Input className="text-base" placeholder="Type your note title here.." type="text" />
            <Textarea
              className="h-60 resize-none"
              placeholder="Type your note here.."
            />
          </form>

          <DrawerFooter className="flex flex-row justify-end gap-2 px-0 pt-3">
            <Button>Upload</Button>
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
export default AddNote;
