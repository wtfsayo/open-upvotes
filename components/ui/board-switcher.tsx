import { api } from "../../src/utils/api";
import { Input } from "@medusajs/ui";
import { PlusIcon } from "lucide-react";
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
import { ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";

import * as z from "zod";
import CreateBoard from "./create-board";

export default function BoardSwitcher({ className }: any) {
  const router = useRouter();
  const { boards } = useBoards();
  const [createBoard, setCreateBoard] = useState(false);

  const [boardsInUse, setBoardsInUse] = useState(boards);

  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState({
    title: "Default",
    path: "/",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    
    const {value} = e.target;
    const filteredBoards = boards?.filter((board) => board.title.toLowerCase().includes(value.toLowerCase()));
    
    setBoardsInUse(filteredBoards);

    
  }

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
            
                <Input
                placeholder={"Find Board"}
                type="search"
                onChange={handleChange}
                autoFocus
              />
            {boardsInUse?.map((Board) => (
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

            <DropdownMenu.Item onSelect={() => setCreateBoard(true)}>
              <PlusIcon size={16} className="mr-2" />
              Create New Board
            </DropdownMenu.Item>
          </DropdownMenu.Content>
          
            <CreateBoard createNewBoard={createBoard} setCreateNewBoard={() => setCreateBoard(!createBoard)}/>

          </DropdownMenu>
  )}