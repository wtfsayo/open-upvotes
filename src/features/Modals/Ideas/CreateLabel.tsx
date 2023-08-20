"use client";
import AutoForm from "@/components/ui/auto-form";
import { Button } from "@medusajs/ui";
import { api } from "@/src/utils/api";
import * as z from "zod";
import { Drawer } from "@medusajs/ui";
const zForm = z.object({
  label: z.string(),
});

export default function CreateLabel() {
  const { mutate: createLabel } = api.labels.createLabel.useMutation();
  return (
    <Drawer>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Create Board</Drawer.Title>
          <Drawer.Description>
            Add a new Board to manage your tasks and ideas.
          </Drawer.Description>
        </Drawer.Header>

        <AutoForm
          formSchema={zForm}
          fieldConfig={{
            label: {
              description: "Label",
              inputProps: {
                placeholder: "Your New Label",
              },
            },
          }}
          onSubmit={(data) => {
            createLabel({ ...data });
          }}
        >
          <Button type="submit">Create Label</Button>
        </AutoForm>
      </Drawer.Content>
    </Drawer>
  );
}
