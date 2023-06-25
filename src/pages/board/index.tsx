import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import CardLane from "./Components/CardLane"
import IdeaDetails from "./Components/Modals/IdeaDetails"
import { useSession } from "next-auth/react"
import { UserNav } from "@/src/components/user-nav"
import { api } from "@/src/utils/api";
import { STATUS } from "@/src/utils/const"
import SubmitIdea from "./Components/Modals/SubmitIdea"
import { Idea, Label, Upvote } from "@prisma/client"
import { ideaProps } from "@/src/utils/const"
import { signInKeyp } from "@usekeyp/js-sdk"
import { useEffect } from "react"


export default function Board() {

  const session = useSession();

  const {data: ideas} = api.idea.getAll.useQuery();
  
  const filteredIdeas = STATUS.map((status) => ideas?.filter((idea) => idea.status == status))

  const mutate = api.user.sync.useMutation();

  useEffect(() =>{ if(session.data?.user) 
    {mutate.mutateAsync()}}
    , [session.data?.expires, ideas]
    )

    return (
      <div>
      <div className="flex flex-row justify-between fixed p-4  w-full text-lg border-2 border-slate-200">
            <p>Nav Bar</p>

            {session.data ? <UserNav/> : <Button variant={"secondary"} className="bg-slate-300" onClick={() => signInKeyp('DISCORD')}>Login</Button>}

            </div>
        <div className="h-screen flex-1 flex-col space-y-8 p-8 bg-slate-100 md:flex pt-32">
          
            <div className="flex flex-row justify-between">
            <div>
            <h3 className="text-2xl font-bold tracking-tight">Here are the ideas we are working on</h3>
            <p className="text-muted-foreground">Upvote or give new ideas to work on</p>
            </div>
            <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button>Submit Idea</Button>
            
            </AlertDialogTrigger>
            <SubmitIdea/>
            
            
            </AlertDialog>
            </div>
            <div className="flex flex-row gap-2 w-full">
            
            {filteredIdeas?.map((ideas, index) => <CardLane key={index} title={STATUS[index] as string} ideas={ideas as ideaProps[]}/>)}
            </div>
            </div>
            </div>
    )
}











