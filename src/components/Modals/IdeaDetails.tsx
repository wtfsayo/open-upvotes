import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@medusajs/ui";
import { Button } from "@medusajs/ui";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { api } from "@/src/utils/api";
import type { ideaProps } from "@/src/utils/const";
import { STATUS } from "@/src/utils/const";
import type { Label, Upvote } from "@prisma/client";
import { ChevronDown, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import AddComment from "./Actions/AddComment";
import { AddLabels } from "./Actions/UpdateLabels";
import Comment from "./sub/Comment";

export default function IdeaDetails(props: ideaProps) {
  const { labels } = props;
  const session = useSession();
  const { data: Alllabels } = api.labels.getAll.useQuery();
  const {
    mutate: Upvote,
    isSuccess: isUpvoted,
    isLoading: isUpvoting,
  } = api.upvote.create.useMutation();
  const {
    mutate: deleteUpvote,
    isSuccess: isUnUpvoted,
    isLoading: isUnUpvoting,
  } = api.upvote.delete.useMutation();
  const { mutate: updateStatus, isLoading: isUpdatingStatus } =
    api.idea.updateStatus.useMutation();
  const { data: comments } = api.comments.getByIdea.useQuery({
    ideaId: props.id,
  });
  const { data: sessionData } = useSession();
  const containsUpvote = props.upvotes?.some(
    (upvote: Upvote) => upvote.user_id == sessionData?.user?.id,
  );

  const { mutate: addLabel } = api.idea.addLabel.useMutation();
  const { mutate: removeLabel } = api.idea.removeLabel.useMutation();
  const { mutate: createLabel } = api.labels.createLabel.useMutation();

  const [ideaStatus, setIdeaStatus] = useState(props.status);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Badge className="w-max rounded-md">{props.id.substring(0,6).toUpperCase()}</Badge>
            {props.title}
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="gap-2 bg-blue-700 px-2 font-medium text-white hover:bg-blue-800"
                  disabled={isUpdatingStatus}
                >
                  {isUpdatingStatus && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {ideaStatus}

                  <Separator orientation="vertical" className="h-[20px] " />

                  <ChevronDown className="text-theme h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                alignOffset={-5}
                className="w-[200px]"
                forceMount
              >
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {STATUS.map((status, id) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={Boolean(
                      status.toLowerCase() == ideaStatus.toLowerCase(),
                    )}
                    onClick={() => {
                      setIdeaStatus(status);
                      updateStatus({ id: props.id, status });
                    }}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </AlertDialogTitle>
        <div className="flex-row-wrap flex flex-row gap-1">
          {labels.map((label: Label) => (
            <Badge key={label.id} >
              {label.label}
            </Badge>
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
      </AlertDialogHeader>
      <div>
        <p className="py-2 font-semibold">Description</p>
        <AlertDialogDescription className="h-min-[120px] h-max-[180px] flex flex-col gap-2 overflow-y-auto rounded-lg bg-muted/40 p-4">
          {props.description}
        </AlertDialogDescription>
      </div>
      <div>
        <AddComment ideaId={props.id} />
        <div className="flex h-[240px]  flex-col gap-2 overflow-y-auto">
          {comments?.map((comment) => (
            <Comment
              username={comment.user.username}
              date={comment.time}
              comment={comment.comment}
              key={comment.time.toLocaleString()}
              imageSrc={comment.user.imageSrc?.toString()}
            />
          ))}
        </div>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel>Close</AlertDialogCancel>
        <Button
          variant={containsUpvote ? "outline" : "default"}
          onClick={() => {
            containsUpvote
              ? deleteUpvote({ ideaId: props.id})
              : Upvote({ ideaId: props.id});
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
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
