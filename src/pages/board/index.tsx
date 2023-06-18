import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { MoreVertical } from "lucide-react"


export default function Board() {
    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 bg-slate-100 md:flex">
            <div className="flex flex-row justify-between">
            <div>
            <h3 className="text-2xl font-bold tracking-tight">Here are the ideas we are working on</h3>
            <p className="text-muted-foreground">Upvote or give new ideas to work on</p>
            </div>
            <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button>Submit Idea</Button>
            
            </AlertDialogTrigger>
            {/* <SubmitIdea/> */}
            
            <IdeaDetails id="idea-details" title="Hello an Idea" description="This is desc of an idea" status="TO_DO" labels={['Wont-do', 'Considering', 'Will doo']}/>
            </AlertDialog>
            </div>
            <div className="flex flex-row gap-2 w-full">
            <CardLane title={'Proposed'}  />
            <CardLane title={'To-do'}/>
            <CardLane title={'In-Progress'}/>
            <CardLane title={'Done'}/>
            <CardLane title={'Archived'}/>
            </div>
            </div>
    )
}



export function IdeaCard() {
  return (
    <Card className="w-full hover:bg-gray-50 pt-2">
      <CardHeader className="flex flex-row justify-between items-center p-3">
        
        <CardTitle className="text-md font-medium leading-none">{'Hello this is my idea and its very good'.substring(0,60) + '...'}</CardTitle>
        
      </CardHeader>
      
      <CardContent className="p-3">
        <CardDescription className="text-sm font-light text-muted-foreground">
            {'Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.'.substring(0,100) + '...'}
        </CardDescription>
        
         </CardContent>
         <CardFooter className="flex justify-between p-3">
        <div>
      <Badge variant={'secondary'}>Important</Badge>
      <Badge variant={'secondary'}>Considering</Badge>
      <Badge variant={'secondary'}>To-do</Badge>
      </div>
      
      </CardFooter>
         <CardContent className="flex flex-row gap-1 p-3">
         <Button variant={'outline'} className="w-full bg-transparent">

         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 16a1 1 0 0 1-.8-1.6l6-8a1 1 0 0 1 1.6 0l6 8A1 1 0 0 1 18 16H6Z"/></svg>
            Upvote
</Button>
<Button variant={'ghost'} onClick={() => console.log('overflown')}><MoreVertical size={17}/></Button>
            </CardContent>
      
    </Card>
  )
}



 function CardLane(props: {title: string}){
    return(
        <Card className="p-4 flex flex-col gap-2 bg-gray-50 w-full">
            <div className="h-max px-2 text-left align-middle font-medium rounded-md text-medium bg-slate-200 text-muted-foreground w-max">{props.title}</div>
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />

    </Card>
    )
}



import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
  
  import { Textarea } from "@/components/ui/textarea"

function SubmitIdea(){
    return(
  
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Submit New Idea</AlertDialogTitle>
      <AlertDialogDescription className="text-md">
        Got an idea? Submit it here and we will consider it for our next sprint.
      </AlertDialogDescription>
      
      <Textarea className="w-full h-[300px] mt-4 resize-none" placeholder="Please explain your idea as a user how would you benefit, what problem this will solve" />
      <p className="text-sm text-muted-foreground">Please explain your idea as a user how would you benefit, what problem this will solve</p>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>

    )
}


function IdeaDetails(props: {id: string, title: string, description: string ,labels: string[], status: string}){
    return(
        <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex flex-row justify-between">
        {props.id}
      <Badge variant={'secondary'}>{props.status}</Badge>
      </AlertDialogTitle>
      <AlertDialogDescription className="text-md ">
        {props.title}
        
      </AlertDialogDescription>
      
      <p className="w-full h-[300px] mt-4">
      {props.description + props.description + props.description + props.description + props.description + props.description + props.description + props.description}
      </p>
      <p className="text-sm text-muted-foreground">Please explain your idea as a user how would you benefit, what problem this will solve</p>
      <div className="flex flex-row">{props.labels.map((label, id) => <Badge key={id} variant={'secondary'}>{label}</Badge>)}</div>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Close</AlertDialogCancel>
      {/* <AlertDialogAction>Continue</AlertDialogAction> */}
    </AlertDialogFooter>
  </AlertDialogContent>
    )
}