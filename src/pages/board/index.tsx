import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import CardLane from "./Components/CardLane"
import IdeaDetails from "./Components/Modals/IdeaDetails"
import { useSession } from "next-auth/react"
import { UserNav } from "@/src/components/user-nav"
import { api } from "@/src/utils/api";

export default function Board() {

  const session = useSession();

  const {data: ideas} = api.idea.getAll.useQuery();
  

  console.log(ideas)
    return (
      <>
      <div className="flex flex-row justify-between fixed  p-4 bg-slate-100 w-full text-lg border-2 border-slate-200">
            <p>Nav Bar</p>

            {session.data ? <UserNav/> : <Button variant={"secondary"} className="bg-slate-300">Login</Button>}
            
            </div>
        <div className="h-full flex-1 flex-col space-y-8 p-8 bg-slate-100 md:flex pt-32">
          
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

And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop." status="TO DO" labels={['Wont-do', 'Considering', 'Will doo']}/>
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
            </>
    )
}











