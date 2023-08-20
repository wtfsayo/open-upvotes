"use client";
import AutoForm from "@/components/ui/auto-form";
import { Button } from "@medusajs/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/src/utils/api";
import * as z from "zod";

const zForm = z.object({
  label: z.string(),
});

export default function CreateLabel() {
  const { mutate: createLabel } = api.labels.createLabel.useMutation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Add Label
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>
            Add a new Board to manage your tasks and ideas.
          </DialogDescription>
        </DialogHeader>
        <div>
          <AutoForm
            formSchema={zForm}
            fieldConfig={{
              label: {
                description: "Label",
                inputProps: {
                  placeholder: "Your New Label",
                },
              },
            }}
            onSubmit={(data) => {
              createLabel({...data});
            }}
          >
            <DialogFooter>
              <Button onClick={() => console.log(false)}>
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </AutoForm>
        </div>
      </DialogContent>
    </Dialog>
  );
}
