import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { api } from "@/src/utils/api";
import { Loader2 } from "lucide-react";

import { z } from "zod";

export default function AddComment(props: { ideaId: string }) {
  const {
    mutate: createNewComment,
    isLoading,
    isSuccess,
  } = api.comments.createComment.useMutation();
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
          createNewComment({
            idea_id: props.ideaId,
            comment: data.comment,
            time: new Date(),
          });
        }}
      >
        <Button
          variant="secondary"
          type="submit"
          className="z-2 absolute bottom-2 right-2"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </AutoForm>
    </div>
  );
}
