import { AlertDialog } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Idea, Label, Upvote } from "@prisma/client";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { MoreVertical } from "lucide-react";
import IdeaDetails from "./Modals/IdeaDetails";

type ideaCardProps = Idea & {upvotes: Upvote[], labels: Label[]}

export default function IdeaCard(props: ideaCardProps) {

  const {title, description, labels, upvotes, id} = props;



    return (


      <AlertDialog>
            <AlertDialogTrigger asChild>
            
            
            


      <Card className="w-full hover:bg-gray-50 pt-2">
        <CardHeader className="flex flex-row justify-between items-center p-3">
          
          <CardTitle className="text-md font-medium leading-none">{title.substring(0,60) + '...'}</CardTitle>
          
        </CardHeader>
        
        <CardContent className="p-3">
          <CardDescription className="text-sm font-light text-muted-foreground">
              {description.substring(0,100) + '...'}
          </CardDescription>
          
           </CardContent>
           {Boolean(labels.length) &&   <CardFooter className="flex justify-between p-3">
          <div className="gap-1">
        {labels.map((label:Label) => <Badge key={label.id} className="px-2.5" variant={'outline'}>{label.label}</Badge>)}
        </div>
        
        </CardFooter>}
           <CardContent className="flex flex-row gap-1 p-3">
           <Button variant={'outline'} className="w-full bg-transparent">
  
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 16a1 1 0 0 1-.8-1.6l6-8a1 1 0 0 1 1.6 0l6 8A1 1 0 0 1 18 16H6Z"/></svg>
              Upvote {'(' + upvotes.length + ')'}
  </Button>
  <Button variant={'ghost'} onClick={() => console.log('overflown')}><MoreVertical size={17}/></Button>
              </CardContent>
        
      </Card>

      </AlertDialogTrigger>
            {/* <SubmitIdea/> */}
            
            <IdeaDetails key={props.id} {...props} />
            </AlertDialog>
    )
  }
  