import {
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AutoForm from "@/components/ui/auto-form";
import { Button } from "@medusajs/ui";

import { api } from "@/src/utils/api";
import { useRouter } from "next/router";
import { z } from "zod";
import { Loader2 } from "lucide-react";

export default function SubmitIdea() {
  const router = useRouter();

  const zForm = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
  });

  const { mutate, isLoading, isSuccess } = api.idea.submit.useMutation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Submit New Idea</DialogTitle>
        <DialogDescription className="text-md">
          Got an idea? Submit it here and we will consider it for our next
          sprint.
        </DialogDescription>
      </DialogHeader>
      <AutoForm
        formSchema={zForm}
        fieldConfig={{
          title: {
            inputProps: {
              placeholder: "Your idea in short...",
              disabled: isLoading,
            },
          },
          description: {
            fieldType: "textarea",
            inputProps: {
              placeholder:
                "Please explain your idea as a user: how would you benefit, what problem this will solve",
              disabled: isLoading,
            },
          },
        }}
        onSubmit={(data) => {
          mutate({
            ...data, boardPath: router?.query.slug as string,
          });
        }}
      >
        <DialogFooter>
          {/* <DialogTrigger asChild>
            <Button type="reset">Cancel</Button>
          </DialogTrigger> */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Idea
          </Button>
        </DialogFooter>
      </AutoForm>
    </DialogContent>
  );
}
