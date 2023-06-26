import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import AddComment from "./Actions/AddComment";
import AddLabels from "./Actions/AddLabels";
import Comment from "./sub/Comment";

export default function IdeaDetails(props: ideaProps) {
  const { labels } = props;
  const { data: Alllabels } = api.labels.getAll.useQuery();
  const { mutate: Upvote } = api.upvote.create.useMutation();
  const { mutate: deleteUpvote } = api.upvote.delete.useMutation();
  const { mutate: updateStatus } = api.idea.updateStatus.useMutation();
  const { data: comments } = api.comments.getByIdea.useQuery({
    idea_id: props.id,
  });
  const { data: sessionData } = useSession();
  const containsUpvote = props.upvotes?.some(
    (upvote: Upvote) => upvote.user_id == sessionData?.user?.id
  );

  const [ideaStatus, setIdeaStatus] = useState(props.status)

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Badge className="w-max rounded-md">{props.id}</Badge>
            {props.title}
            
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="gap-2 bg-blue-700 px-2 font-medium text-white hover:bg-blue-800"
                >
                  {ideaStatus}
                  
                  <Separator orientation="vertical" className="h-[20px] " />

                  <ChevronDown className="h-4 w-4 text-white" />
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
                      status.toLowerCase() == ideaStatus.toLowerCase()
                    )}
                    onClick={() => {
                      setIdeaStatus(status)
                      updateStatus({ id: props.id, status })}}
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
                <Badge key={label.id} className="px-2.5" variant={"outline"}>
                  {label.label}
                </Badge>
              ))}

              {Alllabels && (
                <AddLabels
                  Alllabels={Alllabels}
                  labels={labels}
                  idea_id={props.id}
                />
              )}
            </div>
      </AlertDialogHeader>
      <div>
        <p className="py-2 font-semibold">Description</p>
        <AlertDialogDescription className="h-min-[120px] h-max-[180px] flex flex-col gap-2 overflow-y-auto rounded-lg bg-slate-100 p-4 text-sm font-light text-muted-foreground">
          {props.description}
        </AlertDialogDescription>
      </div>
      <div>
        <p className="py-2 text-lg font-semibold">Comments</p>
        <div className="flex h-[240px]  flex-col gap-2 overflow-y-auto">
          <AddComment ideaId={props.id} />

          {
                      comments?.map((comment) => (
                        <Comment
                          username={comment.user.username}
                          date={comment.time.toLocaleString()}
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
          
          variant={containsUpvote ? 'outline' : 'default'}
          onClick={() => {
            containsUpvote
              ? deleteUpvote({ idea_id: props.id })
              : Upvote({ idea_id: props.id });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 16a1 1 0 0 1-.8-1.6l6-8a1 1 0 0 1 1.6 0l6 8A1 1 0 0 1 18 16H6Z" />
              </svg>
          {containsUpvote ? "Upvoted" : "Upvote"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}




