import AutoForm from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { api } from "@/src/utils/api";

import { z } from "zod";

export default function AddComment(props: { ideaId: string }) {
  const { mutate: createNewComment } = api.comments.createComment.useMutation();
  return (
    <div className="relative">
      <AutoForm
        formSchema={z.object({
          comment: z.string().nonempty(),
        })}
        fieldConfig={{
          comment: {
            fieldType: "textarea",
            inputProps: {
              placeholder: "Your comment...",
            },
          }}}
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
        >
          Submit
        </Button>
      </AutoForm>
    </div>
  );
}
