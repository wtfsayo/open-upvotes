import { Textarea } from "@/components/ui/textarea";
import { api } from "@/src/utils/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddComment(props: { ideaId: string }) {
    const [newComment, setNewComment] = useState("");
    const { mutate: createNewComment } = api.comments.createComment.useMutation();
    return (
      <div className="relative">
        <Textarea
          className="h-[80px] w-full resize-none"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="secondary"
          onClick={() =>
            {newComment && createNewComment({
              idea_id: props.ideaId,
              comment: newComment,
              time: new Date(),
            });
            setNewComment("")
          }
          }
          className="z-2 absolute bottom-2 right-2"
        >
          Submit
        </Button>
      </div>
    );
  }