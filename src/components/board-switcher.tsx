"use client";

import { CheckIcon, ChevronDown, PlusCircleIcon } from "lucide-react";
import * as React from "react";
import { api } from "../utils/api";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "../lib/utils";

interface Board {
  title: string;
  path: string;
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

export default function BoardSwitcher({ className }: PopoverTriggerProps) {
  const { data: rawBoards } = api.boards.getAllByUser.useQuery();
  const {mutate: addBoard} = api.boards.createBoard.useMutation()
  const boards = rawBoards?.map((board) => {
    return { title: board.title, path: board.path };
  });
  const [createBoard, setCreateBoard] = React.useState<Board>({title:"", path:""})
  const [open, setOpen] = React.useState(false);
  const [showNewBoardDialog, setShowNewBoardDialog] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState<Board>({
    title: "Default",
    path: "/",
  });

  return (
    <Dialog open={showNewBoardDialog} onOpenChange={setShowNewBoardDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-title="Select a Board"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedBoard.path}.png`}
                alt={selectedBoard.title}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedBoard.title}
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search Board..." />
              <CommandEmpty>No Board found.</CommandEmpty>
              {rawBoards &&
                boards?.map((Board) => (
                  <CommandItem
                    key={Board.path}
                    onSelect={() => {
                      setSelectedBoard(Board);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${Board.path}.png`}
                        alt={Board.title}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {Board.title}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedBoard.path === Board.path
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <DialogTrigger asChild>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setShowNewBoardDialog(true);
                  }}
                >
                  <PlusCircleIcon className="mr-2 h-5 w-5" />
                  Create Board
                </CommandItem>
              </DialogTrigger>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>
            Add a new Board to manage your tasks and ideas.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Board name</Label>
              <Input id="name" placeholder="Acme Inc." value={createBoard.title} onChange={(e) => setCreateBoard({title: e.target.value, path: createBoard.path})}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Board URL path</Label>
              <Input id="path" placeholder="/" value={createBoard.path} onChange={(e) => setCreateBoard({path: e.target.value, title: createBoard.title})}/>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewBoardDialog(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => addBoard(createBoard)}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
