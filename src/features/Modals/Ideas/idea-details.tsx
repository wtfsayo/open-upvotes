import { Drawer } from "@medusajs/ui";
import { Badge } from "@medusajs/ui";
import { Button } from "@medusajs/ui";
import { DropdownMenu } from "@medusajs/ui";
import { Separator } from "@/components/ui/separator";
import { STATUS } from "@/src/utils/const";
import { ChevronDown, Loader2 } from "lucide-react";
import { useIdeas } from "./hooks";

import AddComment from "./AddComment";
import { AddLabels } from "./UpdateLabels";
import Comment from "../sub/Comment";

export default function IdeaDetails({id: string}) {
  
  const { getIdea } = useIdeas();
  
  const idea = getIdea(id as string);

  const { updateIdeaStatus, updatingIdeaStatus } = useIdeas();

  return (
    <Drawer>
      <Drawer.Header>
        <Drawer.Title className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Badge>
              {idea?.id}
            </Badge>
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
        </Drawer.Title>
        <div className="flex-row-wrap flex flex-row gap-1">
          {idea?.labels.map((label: Label) => (
            <Badge key={label.id}>{label.label}</Badge>
          ))}

          {Alllabels && (
            <AddLabels
              title="Labels"
              options={Array.from(Alllabels)}
              added={Array.from(labels)}
              handle={{
                add: addLabel,
                remove: removeLabel,
                create: createLabel,
              }}
              ideaId={props.id}
            />
          )}
        </div>
      </Drawer.Header>
      <div>
        <p className="py-2 font-semibold">Description</p>
        <Drawer.Description className="h-min-[120px] h-max-[180px] flex flex-col gap-2 overflow-y-auto rounded-lg bg-muted/40 p-4">
          {props.description}
        </Drawer.Description>
      </div>
      <div>
        <AddComment ideaId={props.id} />
        <div className="flex h-[240px]  flex-col gap-2 overflow-y-auto">
          {idea?.comments?.map((comment) => (
            <Comment
              username={comment?.user?.username}
              date={comment.time}
              comment={comment.comment}
              key={comment.time.toLocaleString()}
              imageSrc={comment?.user?.imageSrc?.toString()}
            />
          ))}
        </div>
      </div>

      <Drawer.Footer>
        <Drawer.Close>Close</Drawer.Close>
        <Button
          onClick={() => {
            containsUpvote
              ? deleteUpvote({ ideaId: props.id })
              : Upvote({ ideaId: props.id });
          }}
          disabled={isUpvoting || isUnUpvoting}
        >
          {!(isUpvoting || isUnUpvoting) ? (
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
          {containsUpvote ? "Upvoted" : "Upvote"} ({props.upvotes?.length})
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
}
