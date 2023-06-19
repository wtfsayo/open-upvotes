import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Archive, ChevronDown, Plus, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function IdeaDetails(props: {id: string, title: string, description: string ,labels: string[], status: string}){
    return(
        <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
            <Badge className="rounded-md w-max">{props.id.toLocaleUpperCase()}</Badge>
            {props.title}
            <div className="flex flex-row flex-row-wrap">{props.labels.map((label, id) => <Badge key={id} variant={'secondary'}>{label}</Badge>)}</div>
            
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
              {Status.map((status, id) => <DropdownMenuCheckboxItem key={id} checked={Boolean(status.toLowerCase() == props.status.toLowerCase())}>{status}</DropdownMenuCheckboxItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      </AlertDialogTitle>
      </AlertDialogHeader>
      <div>
      <p className="font-semibold py-2">Description</p>
      <AlertDialogDescription className="text-sm p-4 h-[180px] rounded-lg font-light text-muted-foreground bg-slate-100 flex flex-col gap-2 overflow-y-auto">
        
        
        
      
      
      {props.description}
      

      </AlertDialogDescription>
      </div>
      <div>
      <p className="text-lg font-semibold py-2">Comments</p>
    <div className="h-[240px] gap-2  flex flex-col overflow-y-auto">
    <AddComment/>  
      <Comment username="John Doe" date="1 day ago" comment="This is a comment" />
      <Comment username="John Doe" date="1 day ago" comment="This is a comment" />
      <Comment username="John Doe" date="1 day ago" comment="This is a comment" />
      <Comment username="John Doe" date="1 day ago" comment="This is a comment" />
      </div>
      
      </div>  
    

    <AlertDialogFooter>
    
      <AlertDialogCancel>Close</AlertDialogCancel>
      <AlertDialogAction className="w-full">Upvote</AlertDialogAction>  
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


function AddComment(props: {ideaId?: string}){
    return(
        <div className="relative">
            <Textarea className="w-full h-[80px] resize-none" placeholder="Add a comment" />
            <Button variant='secondary'onClick={() => alert(props.ideaId)} className="absolute bottom-2 right-2 z-2">Submit</Button>
        </div>
    )
}



const Status = ['To Do', 'In Progress', 'Done', 'Archived']