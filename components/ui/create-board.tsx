import { Drawer } from "@medusajs/ui";
import AutoForm from "./auto-form";
 import { Button } from "@medusajs/ui";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useBoards } from "@/src/features/Modals/Boards/hooks";


import * as z from "zod";
import { useRouter } from "next/router";
const zForm = z.object({
    title: z.string().nonempty(),
    path: z
      .string()
      .refine(
        (val) => val.match("^[a-z0-9]+(?:-[a-z0-9]+)*$"),
        "Please provide a valid path",
      ),
  });

interface CreateBoardProps {
    createNewBoard: boolean;
    setCreateNewBoard: (value: boolean) => void;
  }

export default function CreateBoard({createNewBoard, setCreateNewBoard}: CreateBoardProps) {

    const router = useRouter();
    const [values, setValues] =useState<Partial<z.infer<typeof zForm>>>(
        {},
      );
        
    const { addBoard, isLoading } = useBoards();
    return(
        <Drawer open={createNewBoard} onOpenChange={setCreateNewBoard}>
        <Drawer.Content >
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
    )
}