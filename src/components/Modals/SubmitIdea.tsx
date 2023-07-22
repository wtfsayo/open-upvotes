import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";

import { api } from "@/src/utils/api";
import { useRouter } from "next/router";
import { z } from "zod";

export default function SubmitIdea() {
  const router = useRouter();

  const zForm = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
  });

  const { mutate } = api.idea.submit.useMutation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Submit New Idea</DialogTitle>
        <DialogDescription className="text-md">
          Got an idea? Submit it here and we will consider it for our next
          sprint.
        </DialogDescription>
      </DialogHeader>
      {/* <Textarea
        className="mt-4 h-[300px] w-full resize-none"
        placeholder="Please explain your idea as a user: how would you benefit, what problem this will solve"
        onChange={(e) =>
          setNewIdea({ ...newIdea, description: e.target.value })
        }
      /> */}

      <AutoForm
        formSchema={zForm}
        fieldConfig={{
          title: {
            inputProps: {
              type: "text",
              placeholder: "Your idea in short...",
            }
          },
          description: {
            inputProps: {
              type: "textarea",
              placeholder:
                "Please explain your idea as a user: how would you benefit, what problem this will solve",
              
            },
          },
        }}
        onSubmit={(data) => {
          mutate({ ...data, board_path: router.pathname });
        }}
      >
        <DialogFooter>
          <Button type="reset">Cancel</Button>
          <Button type="submit">Submit Idea</Button>
        </DialogFooter>
      </AutoForm>
    </DialogContent>
  );
}
