import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import CardLane from "./Components/CardLane"
import IdeaDetails from "./Components/Modals/IdeaDetails"


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
            
            <IdeaDetails id="idea-details" title="Hello an Idea" description="Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.

And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop." status="TO_DO" labels={['Wont-do', 'Considering', 'Will doo']}/>
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











