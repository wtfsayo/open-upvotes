import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { api } from "@/src/utils/api";
import { STATUS, ideaProps } from "@/src/utils/const";
import { Label, Upvote } from "@prisma/client";
import { Check, CheckCheckIcon, ChevronDown, PlusCircle, Square } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function IdeaDetails(props: ideaProps){

  
  const {labels} = props;
   const {data: Alllabels} = api.labels.getAll.useQuery();
  const {mutate:Upvote} = api.upvote.create.useMutation();
  const {mutate:deleteUpvote} = api.upvote.delete.useMutation();
  const {mutate: updateStatus} = api.idea.updateStatus.useMutation();
  const {data: comments} = api.comments.getByIdea.useQuery({idea_id: props.id})
  const { data: sessionData } = useSession();
  const containsUpvote = props.upvotes?.some((upvote: Upvote) => upvote.user_id == sessionData?.user?.id);
  

    return(
        <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
            <Badge className="rounded-md w-max">{props.id}</Badge>
            {props.title}
            <div className="flex flex-row flex-row-wrap gap-1">{ labels.map((label: Label, id: any) => <Badge key={id} className="px-2.5" variant={'outline'}>{label.label}</Badge>)}
            
            {Alllabels && <AddLabels Alllabels={Alllabels} labels={labels} idea_id={props.id} />}
            </div>
            
            
        </div>
        
        <div>
      

      <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 gap-2 text-white font-medium bg-blue-700 hover:bg-blue-800">
              
            
            {props.status}
          
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
              {STATUS.map((status, id) => <DropdownMenuCheckboxItem key={id} checked={Boolean(status.toLowerCase() == props.status.toLowerCase())} onClick={() => updateStatus({id: props.id, status})}>{status}</DropdownMenuCheckboxItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      </AlertDialogTitle>
      </AlertDialogHeader>
      <div>
      <p className="font-semibold py-2">Description</p>
      <AlertDialogDescription className="text-sm p-4 h-min-[120px] h-max-[180px] rounded-lg font-light text-muted-foreground bg-slate-100 flex flex-col gap-2 overflow-y-auto">
        
        
        
      
      
      {props.description}
      
      
      </AlertDialogDescription>
      </div>
      <div>
      <p className="text-lg font-semibold py-2">Comments</p>
    <div className="h-[240px] gap-2  flex flex-col overflow-y-auto">
    <AddComment ideaId={props.id}/>  

    {comments && comments.map((comment, key) => <Comment username={comment.user.username} date={comment.time.toDateString()} comment={comment.comment} />)}
      
      </div>
      
      </div>  
    

    <AlertDialogFooter>
    
      <AlertDialogCancel>Close</AlertDialogCancel>
      <AlertDialogAction className="w-full" onClick={() => {!containsUpvote ? Upvote({idea_id: props.id}) : deleteUpvote({idea_id: props.id})}}>{containsUpvote ? 'Upvoted' : 'Upvote'}</AlertDialogAction>  
    </AlertDialogFooter>
  </AlertDialogContent>
    )
}



function Comment(props: {username: string, comment: string, date: string}){
    return(
        <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-lg text-sm">
           
            
            
            
                
            
        <div className="flex flex-row gap-2 items-center">
                        <Avatar className="w-[24px] h-[24px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="font-medium leading-none">{props.username + '\t'}</p>
                        <p className=" text-muted-foreground">{props.date}</p>

        </div>
                        {props.comment}
                        
                        
                        
                        
                
                

            </div>
    )
}


function AddComment(props: {ideaId: string}){

  const [newComment, setNewComment] = useState('');
  const {mutate: createNewComment} = api.comments.createComment.useMutation();
    return(
        <div className="relative">
            <Textarea className="w-full h-[80px] resize-none" placeholder="Add a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
            <Button variant='secondary'  onClick={() => createNewComment({idea_id: props.ideaId, comment: newComment, time: new Date()})} className="absolute bottom-2 right-2 z-2">Submit</Button>
        </div>
    )
}





function AddLabels(props: {Alllabels: Label[], labels:Label[], idea_id: string}){

  const {Alllabels, labels, idea_id} = props;
  const {mutate: addLabel} = api.idea.addLabel.useMutation();
  const {mutate: removeLabel} = api.idea.removeLabel.useMutation();
  return(
    
    
          <Popover>
          <PopoverTrigger asChild>
          <Button variant="outline" size={"sm"} className="rounded-full w-max px-2.5  py-0 text-xs border-dashed border-slate-200">
          <PlusCircle className="mr-2 h-4 w-4 " />
          Add Labels
          </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
          <CommandInput placeholder={"Labels"} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
                    {Alllabels.map((label, id) => (
                      <CommandItem key={label.id}>
                        <div className="flex flex-row gap-1 items-center" onClick={() => {
                          labels.some((x: Label) => x.label === label.label) ? removeLabel({id: idea_id, label_id: label.id}) : addLabel({id: idea_id, label_id: label.id})
                        }}>
                         {labels.some((x: Label) => x.label === label.label) ? <Check size={16}/> : <Square size={16} strokeWidth={1.25} absoluteStrokeWidth />} {label.label}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>

            
          </CommandList>
        </Command>
      </PopoverContent>

           
          
        </Popover>
        
  )
}
