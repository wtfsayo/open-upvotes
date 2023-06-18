import { AlertDialogHeader, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function IdeaDetails(props: {id: string, title: string, description: string ,labels: string[], status: string}){
    return(
        <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
            <Badge className="rounded-md w-max">{props.id.toLocaleUpperCase()}</Badge>
            {props.title}
            <div className="flex flex-row">{props.labels.map((label, id) => <Badge key={id} variant={'secondary'}>{label}</Badge>)}</div>
            
        </div>
        
        <div>
      <Badge variant={'secondary'}>{props.status}</Badge>
      </div>
      </AlertDialogTitle>
      <p className="font-semibold">Description</p>
      <AlertDialogDescription className="text-sm p-4 h-[180px] rounded-lg font-light text-muted-foreground bg-slate-100 flex flex-col gap-2 overflow-y-auto">
        
        
        
      
      
      {props.description}
      

      </AlertDialogDescription>
    
      <p className="text-lg font-semibold ">Comments</p>
    <div className="h-[240px] gap-2  flex flex-col overflow-y-auto">
    <AddComment/>  
      <Comment username="John Doe" date="1 day ago" comment="This is a comment" />
      <Comment username="John Doe" date="1 day ago" comment="This is a comment" />
      <Comment username="John Doe" date="1 day ago" comment="This is a comment" />
      <Comment username="John Doe" date="1 day ago" comment="This is a comment" />
      </div>
      
      
    </AlertDialogHeader>
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
        <>
            <Textarea className="w-full h-[80px] resize-none" placeholder="Add a comment" />
            <Button variant='secondary'onClick={() => alert(props.ideaId)}>Submit</Button>
        </>
    )
}