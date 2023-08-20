import { api } from "../../src/utils/api";

export const useBoards = () => {
  const { data: rawBoards } = api.boards.getAllByUser.useQuery();
  const { mutate: addBoard, isLoading } = api.boards.createBoard.useMutation();
  const { data: allBoards } = api.boards.getAllBoards.useQuery();

  const boards = rawBoards?.map((board) => ({
    title: board.title,
    path: board.path,
  }));

  return { boards, allBoards, addBoard, isLoading };
};

import { Avatar, Button, DropdownMenu } from "@medusajs/ui";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import * as React from "react";


import * as z from "zod";
const zForm = z.object({
  title: z.string().nonempty(),
  path: z
    .string()
    .refine(
      (val) => val.match("^[a-z0-9]+(?:-[a-z0-9]+)*$"),
      "Please provide a valid path",
    ),
});

export default function BoardSwitcher({ className }: any) {
  const router = useRouter();
  const { boards, addBoard, isLoading } = useBoards();

  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState({
    title: "Default",
    path: "/",
  });
  

  return (
    
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
          >
            <Avatar
              src={`https://avatar.vercel.sh/${selectedBoard.path}.png`}
              fallback={selectedBoard.title}
            />
            {selectedBoard.title}
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="z-10">
          
            {boards?.map((Board) => (
              <DropdownMenu.Item
                key={Board.path}
                onClick={() => {
                  setSelectedBoard(Board);
                  setOpen(false);
                  void router.push(Board.path);
                }}
              >
                {Board.title}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
          
            

          </DropdownMenu>
  )}