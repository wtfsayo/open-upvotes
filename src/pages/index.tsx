import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/src/components/user-nav";
import { api } from "@/src/utils/api";
import { STATUS, type ideaProps } from "@/src/utils/const";
import { signInKeyp } from "@usekeyp/js-sdk";
import { filter, map } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CardLane from "@/src/components/CardLane";
import SubmitIdea from "@/src/components/Modals/SubmitIdea";
import { Filter } from "@/src/components/Modals/Actions/Filter";
import { Input } from "@/components/ui/input";
import BoardSwitcher from "../components/board-switcher";
import { ThemeToggle } from "../components/theme-toggle";
import { useToast } from "@/components/ui/use-toast";
export default function Home() {
  const session = useSession();
  const { data: ideas } = api.idea.getAll.useQuery();
  const [search, setSearch] = useState("");
  const [Filterd, setFilterd] = useState(STATUS);

  const filteredIdeas = map(Filterd, (status) =>
    filter(ideas, (idea) => {
      return (
        idea.status === status &&
        (idea.title.toLowerCase().includes(search.toLowerCase()) ||
          idea.description.toLowerCase().includes(search.toLowerCase()))
      );
    }),
  );

  const mutate = api.user.sync.useMutation();

  useEffect(() => {
    if (session.data?.user) {
      mutate.mutateAsync().catch((e: Error) => e);
    }
  }, [session.data?.expires]);

  return (
    <div>
      <div className="fixed flex w-full flex-row justify-between border-2   p-4 text-lg">
        <BoardSwitcher />
        <div className="flex flex-row gap-2 align-middle">
          {session.data ? (
            <UserNav />
          ) : (
            <Button
              variant="secondary"
              className="bg-accent hover:bg-accent/80"
              onClick={() => signInKeyp("DISCORD")}
            >
              Login
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
      <div className="h-full flex-1 flex-col space-y-8  p-8 pt-32 md:flex">
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
        <div className="justify-right flex flex-row ">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Filter
            options={Array.from(STATUS)}
            title="Filter"
            handle={setFilterd}
          />
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
