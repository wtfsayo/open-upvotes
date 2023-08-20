// useBoards.js
import { FocusModal } from "@medusajs/ui";
import { api } from "../utils/api";

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

import { useRouter } from "next/router";
import * as React from "react";

import AutoForm from "@/components/ui/auto-form";
import { Avatar, Button, Drawer, DropdownMenu } from "@medusajs/ui";
import { ChevronDown, Loader2 } from "lucide-react";


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
  const [showNewBoardDialog, setShowNewBoardDialog] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState({
    title: "Default",
    path: "/",
  });
  const [values, setValues] = React.useState<Partial<z.infer<typeof zForm>>>(
    {},
  );

  return (
    <Drawer open={showNewBoardDialog} onOpenChange={setShowNewBoardDialog}>
      <FocusModal open={open} onOpenChange={setOpen}>
        <FocusModal.Trigger asChild>
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
        </FocusModal.Trigger>
        <FocusModal.Content className="w-[200px] p-0">
          <DropdownMenu>
            {boards?.map((Board) => (
              <DropdownMenu.Item
                key={Board.path}
                onSelect={() => {
                  setSelectedBoard(Board);
                  setOpen(false);
                  void router.push(Board.path);
                }}
              >
                {Board.title}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu>
          <Drawer.Trigger>
            <DropdownMenu.Item />
          </Drawer.Trigger>
        </FocusModal.Content>
      </FocusModal>
      <Drawer.Content>
          <Drawer.Header>
          <Drawer.Title>Create Board</Drawer.Title>
          <Drawer.Description>
            Add a new Board to manage your tasks and ideas.
          </Drawer.Description>
        </Drawer.Header>
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
                },
              },
            }}
            onSubmit={(data) => {
              addBoard(data);
            }}
          >
            <Drawer.Footer>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </Drawer.Footer>
          </AutoForm>
        </div>
      </Drawer.Content>
    </Drawer>
  );
}
