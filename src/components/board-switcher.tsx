"use client";

import { CheckIcon, ChevronDown, PlusCircleIcon } from "lucide-react";
import * as React from "react";
import { api } from "../utils/api";

import AutoForm from "@/components/ui/auto-form";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as z from "zod";
import { cn } from "../lib/utils";

const zForm = z.object({
  title: z.string().nonempty(),
  path: z.string().nonempty(),
});

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

export default function BoardSwitcher({ className }: PopoverTriggerProps) {
  const { data: rawBoards } = api.boards.getAllByUser.useQuery();
  const { mutate: addBoard } = api.boards.createBoard.useMutation();
  const { data: allBoards } = api.boards.getAllBoards.useQuery();
  console.log(
    allBoards?.map((board) => {
      board.path, board.title;
    }),
  );
  const boards = rawBoards?.map((board) => {
    return { title: board.title, path: board.path };
  });
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
          <AutoForm
            formSchema={zForm}
            fieldConfig={{
              title: {
                description: "This will be the name of your board.",
                inputProps: {
                  placeholder: "Board Title",
                },
              },
              path: {
                description:
                  "This will be used to create a unique URL for your board.",
                inputProps: {
                  placeholder: "/your-board-path",
                },
              },
            }}
            onSubmit={(data) => {
              addBoard(data);
            }}
          >
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewBoardDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </AutoForm>
        </div>
      </DialogContent>
    </Dialog>
  );
}
