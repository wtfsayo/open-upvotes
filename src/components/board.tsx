import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import CardLane from "@/src/components/CardLane";
import { Filter } from "@/src/components/Modals/Actions/Filter";
import SubmitIdea from "@/src/components/Modals/SubmitIdea";
import { UserNav } from "@/src/components/user-nav";
import { api } from "@/src/utils/api";
import { STATUS, type ideaProps } from "@/src/utils/const";
import { signInKeyp } from "@usekeyp/js-sdk";
import { filter, map } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BoardSwitcher from "../components/board-switcher";
import { ThemeToggle } from "../components/theme-toggle";

export default function Board(props: { path: string }) {
  const session = useSession();

  const { data: ideas } = api.idea.getAllByBoard.useQuery({
    boardPath: props.path,
  });
  const [search, setSearch] = useState("");
  const [Filterd, setFilterd] = useState(STATUS);

  const filteredIdeas = map(Filterd, (status) =>
    filter(ideas as ideaProps[], (idea) => {
      return (
        idea.status === status &&
        (idea.title?.toLowerCase().includes(search.toLowerCase()) ||
          idea.description?.toLowerCase().includes(search.toLowerCase()))
      );
    }),
  );

  const userSync = api.user.sync.useMutation();

  useEffect(() => {
    () => userSync.mutate();
  });

  return (
    <div className="">
      <div className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
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
      <div className="h-full flex-1 flex-col space-y-8  bg-custom min-h-screen 
       p-8 pt-16  md:flex">
        <div className="flex flex-row justify-between  w-full">
          <div className="max-w-['50%'] mr-8">
            <h3 className="text-2xl font-bold tracking-tight ">
              Here are the ideas we are working on
            </h3>
            <p className="text-muted-foreground max-w-['50%']">
              Upvote or give new ideas to work on
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="min-w-max ">Submit Idea</Button>
            </DialogTrigger>
            <SubmitIdea />
          </Dialog>
        </div>
        <div className="justify-right flex flex-row gap-2">
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
        <div className="flex gap-2 max-xl:flex-wrap">
          {filteredIdeas?.map((ideas, index) => (
            <CardLane
              key={STATUS[index]}
              title={STATUS[index] as string}
              ideas={ideas}
            />
          ))}
        </div>
      
      </div>
      
      <div className="items-center p-8">
        Footer
      </div>
    </div>
  );
}
