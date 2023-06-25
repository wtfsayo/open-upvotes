import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/src/components/user-nav";
import { api } from "@/src/utils/api";
import { STATUS, type ideaProps } from "@/src/utils/const";
import Fuse from 'fuse.js'
import { signInKeyp } from "@usekeyp/js-sdk";
import { filter, map } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CardLane from "./board/Components/CardLane";
import SubmitIdea from "./board/Components/Modals/SubmitIdea";
import { Input } from "@/components/ui/input";

export default function Board() {
  const session = useSession();
  const { data: ideas } = api.idea.getAll.useQuery();
  const filteredIdeas = map(STATUS, (status) => filter(ideas, { status }));
  
  
  
  const mutate = api.user.sync.useMutation();
  
  
  useEffect(() => {
    if (session.data?.user) {
      mutate.mutateAsync();
    }
  }, [session.data?.expires]);

  return (
    <div>
      <div className="fixed flex w-full flex-row justify-between border-2 bg-slate-100  p-4 text-lg">
        <p className="text-md font-bold">Open Vote</p>
        {session.data ? (
          <UserNav />
        ) : (
          <Button
            variant="secondary"
            className="bg-slate-300"
            onClick={() => signInKeyp("DISCORD")}
          >
            Login
          </Button>
        )}
      </div>
      <div className="h-full flex-1 flex-col space-y-8 bg-slate-100 p-8 pt-32 md:flex">
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              Here are the ideas we are working on
            </h3>
            <p className="text-muted-foreground">
              Upvote or give new ideas to work on
            </p>
          </div>
          
          
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-max">Submit Idea</Button>
            </AlertDialogTrigger>
            <SubmitIdea />
          </AlertDialog>
          
        </div>
        <div className="flex w-full flex-row gap-2 ">
          {filteredIdeas?.map((ideas, index) => (
            <CardLane
              key={STATUS[index]}
              title={STATUS[index] as string}
              ideas={ideas as ideaProps[]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
