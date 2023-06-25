import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { api } from "@/src/utils/api";
import { useState } from "react";

export default function SubmitIdea() {
  const [newIdea, setNewIdea] = useState({ title: "", description: "" });

  const { mutate } = api.idea.submit.useMutation();
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Submit New Idea</AlertDialogTitle>
        <AlertDialogDescription className="text-md">
          Got an idea? Submit it here and we will consider it for our next
          sprint.
        </AlertDialogDescription>
        <Input
          className="mt-4 w-full resize-none"
          placeholder="Describe your idea in short"
          onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
        />
        <Textarea
          className="mt-4 h-[300px] w-full resize-none"
          placeholder="Please explain your idea as a user: how would you benefit, what problem this will solve"
          onChange={(e) =>
            setNewIdea({ ...newIdea, description: e.target.value })
          }
        />

        <p className="text-sm text-muted-foreground">
          Please explain your idea as a user how would you benefit, what problem
          this will solve
        </p>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => mutate(newIdea)}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
