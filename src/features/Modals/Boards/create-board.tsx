import { FocusModal, Heading } from "@medusajs/ui";
import AutoForm from "../../../../components/ui/auto-form";
import { Button } from "@medusajs/ui";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useBoards } from "@/src/features/Modals/Boards/hooks";
import { useRef } from "react";
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

export default function CreateBoard(
  { createNewBoard, setCreateNewBoard }: CreateBoardProps,
) {
  const router = useRouter();
  const [values, setValues] = useState<Partial<z.infer<typeof zForm>>>({});

  const formRef = useRef<HTMLButtonElement>(null);
  const { addBoard, isLoading } = useBoards();
  return (
    <FocusModal open={createNewBoard} onOpenChange={setCreateNewBoard}>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button disabled={isLoading} onClick={() => formRef.current?.click()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Board
          </Button>
        </FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <div className="flex w-full max-w-lg flex-col gap-y-8 p-6">
            <div className="flex flex-col gap-y-1">
              <Heading>Create a new board</Heading>
              <p className="mb-8 text-gray-500">
                Boards are where you manage your projects. You can create boards
                for anything — like mananing your family stuff.
              </p>
            </div>
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
              <Button
                type="submit"
                disabled={isLoading}
                ref={formRef}
                className="hidden"
              >
                Create Board
              </Button>
            </AutoForm>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}
