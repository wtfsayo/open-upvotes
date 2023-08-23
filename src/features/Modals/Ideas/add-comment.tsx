import AutoForm from "@/components/ui/auto-form";
import { Button } from "@medusajs/ui";
import { Loader2 } from "lucide-react";

import { z } from "zod";
import { useComments } from "../Comments/hooks";

export default function AddComment(props: { ideaId: string, isLoading: boolean }) {

  const { ideaId:id, isLoading } = props;

  const { addComment, addingComment} =  useComments({id})
  return (
    <div className="relative">
      <AutoForm
        className="mb-2"
        formSchema={z.object({
          comment: z.string().nonempty(),
        })}
        fieldConfig={{
          comment: {
            fieldType: "textarea",
            inputProps: {
              placeholder: "Your comment...",
              disabled: isLoading,
            },
          },
        }}
        onSubmit={(data) => {
          addComment(data.comment);
        }}
      >
        <Button
          variant="secondary"
          type="submit"
          className="z-2 absolute bottom-2 right-2"
          disabled={addingComment || isLoading}
        >
          {addingComment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </AutoForm>
    </div>
  );
}
