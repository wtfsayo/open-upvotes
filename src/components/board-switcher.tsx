"use client";

import { CheckIcon, ChevronDown, Loader2, PlusCircleIcon } from "lucide-react";
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
import { useRouter } from "next/router";
import * as z from "zod";
import { cn } from "../lib/utils";
const zForm = z.object({
  title: z.string().nonempty(),
  path: z
    .string()
    .refine(
      (val) => val.match("^[a-z0-9]+(?:-[a-z0-9]+)*$"),
      "Please provide a valid path",
    ),
});

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

export default function BoardSwitcher({ className }: PopoverTriggerProps) {
  const router = useRouter();
  const { data: rawBoards } = api.boards.getAllByUser.useQuery();
  const {
    mutate: addBoard,
    isLoading,
    isSuccess,
  } = api.boards.createBoard.useMutation();
  const { data: allBoards } = api.boards.getAllBoards.useQuery();
  // console.log(
  //   allBoards?.map((board) => {
  //     board.path, board.title;
  //   }),
  // );
  const boards = rawBoards?.map((board) => {
    return { title: board.title, path: board.path };
  });
  const [open, setOpen] = React.useState(false);

  const [showNewBoardDialog, setShowNewBoardDialog] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState({
    title: "Default",
    path: "/",
  });
  const [values, setValues] = React.useState<Partial<z.infer<typeof zForm>>>(
    {},
  );

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
                      void router.push(Board.path);
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
            values={values}
            onValuesChange={setValues}
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
                  "Your board path will be /" +
                  String(router.basePath) +
                  String(values?.path),
                inputProps: {
                  placeholder: "your-unique-board-path",
                  // pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
                },
              },
            }}
            onSubmit={(data) => {
              console.log(data);
              addBoard(data);
            }}
          >
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </AutoForm>
        </div>
      </DialogContent>
    </Dialog>
  );
}
