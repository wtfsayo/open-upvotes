import { Separator } from "@/components/ui/separator";
import { STATUS } from "@/src/utils/const";
import { Badge, Button, DropdownMenu, FocusModal } from "@medusajs/ui";
import { ChevronDown, Loader2 } from "lucide-react";
import { useIdeas } from "./hooks";

import AddComment from "./add-comment";
// import { AddLabels } from "../Labels/update-labels";
import type { Label } from "@prisma/client";

import { useSession } from "next-auth/react";
import Comment from "../sub/Comment";



export default function IdeaDetails(id: string) {



  const { getIdea, updateIdeaStatus, updatingIdeaStatus } = useIdeas();
  // const {addIdeaLabel, addingIdeaLabel, removeIdeaLabel, removingIdeaLabel} = useIdeas();
  const { upvoteIdea, upvotingIdea, removeVote, removingVote } = useIdeas();

  const idea = getIdea(id);
  const session = useSession();

  const currentUserUpvoted = idea?.upvotes.some(
    (upvote) => upvote.user_id === session.data?.user?.id,
  );



  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        <Button className="hidden">
          Use Ref
        </Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <FocusModal.Header className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Badge>{idea?.id}</Badge>
            {idea?.title}
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button
                  className="gap-2 bg-blue-700 px-2 font-medium text-white hover:bg-blue-800"
                  disabled={updatingIdeaStatus}
                >
                  {updatingIdeaStatus && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {idea?.status || "Status"}

                  <Separator orientation="vertical" className="h-[20px] " />

                  <ChevronDown className="text-theme h-4 w-4" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                align="end"
                alignOffset={-5}
                className="w-[200px]"
                forceMount
              >
                <DropdownMenu.Label>Status</DropdownMenu.Label>
                <DropdownMenu.Separator />
                {STATUS.map((status) => (
                  <DropdownMenu.CheckboxItem
                    key={status}
                    checked={Boolean(
                      status.toLowerCase() == idea?.status?.toLowerCase(),
                    )}
                    onClick={() => {
                      updateIdeaStatus({ id: idea?.id as string, status });
                    }}
                  >
                    {status}
                  </DropdownMenu.CheckboxItem>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </FocusModal.Header>
        <div className="flex-row-wrap flex flex-row gap-1">
          {idea?.labels?.map((label: Label) => (
            <Badge key={label.id}>{label.label}</Badge>
          ))}

          {/* {idea?.labels && (
            <AddLabels
              title="Labels"
              options={Array.from(idea?.labels)}
              added={Array.from(idea?.labels)}
              handle={{
                add: addLabel,
                remove: removeLabel,
                create: createLabel,
              }}
              ideaId={id}
            />
          )} */}
        </div>

        <div>
          <p className="py-2 font-semibold">Description</p>

          {idea?.description}
        </div>
        <div>
          <AddComment ideaId={id} />
          <div className="flex h-[240px]  flex-col gap-2 overflow-y-auto">
            {idea?.comments?.map((comment) => (
              <Comment
                username={comment.user_id}
                date={comment.time}
                comment={comment.comment}
                key={comment.time.toLocaleString()}
                imageSrc={comment.user_id}
              />
            ))}
          </div>
        </div>

        <FocusModal.Body>
          <Button
            onClick={() => {
              currentUserUpvoted
                ? upvoteIdea({ ideaId: idea?.id as string })
                : removeVote({ ideaId: idea?.id as string });
            }}
            disabled={upvotingIdea || removingVote}
          >
            {!(removingVote || upvotingIdea) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 16a1 1 0 0 1-.8-1.6l6-8a1 1 0 0 1 1.6 0l6 8A1 1 0 0 1 18 16H6Z"
                />
              </svg>
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {currentUserUpvoted ? "Upvoted" : "Upvote"} ({idea?.upvotes?.length}
            )
          </Button>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}
