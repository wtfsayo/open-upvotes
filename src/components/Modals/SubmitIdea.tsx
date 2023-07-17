import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { api } from "@/src/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SubmitIdea() {

  const router = useRouter();
  const [newIdea, setNewIdea] = useState({ title: "", description: "", board_path: router.pathname });


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
        <Button onClick={() => {
          mutate(newIdea);
          setNewIdea({title: "", description: "", board_path: router.pathname})
        }}>
          Submit Idea
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
