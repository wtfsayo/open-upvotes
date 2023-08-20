import AutoForm from "@/components/ui/auto-form";
import { api } from "@/src/utils/api";
import { Button, Drawer } from "@medusajs/ui";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { z } from "zod";

export default function SubmitIdea() {
  const router = useRouter();

  const zForm = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
  });

  const { mutate, isLoading, isSuccess } = api.idea.submit.useMutation();

  return (
    <Drawer>
  <Drawer.Trigger>
    <Button>Submit Idea</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Drawer Title</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>

    <AutoForm
        formSchema={zForm}
        fieldConfig={{
          title: {
            inputProps: {
              placeholder: "Your idea in short...",
              disabled: isLoading,
            },
          },
          description: {
            fieldType: "textarea",
            inputProps: {
              placeholder:
                "Please explain your idea as a user: how would you benefit, what problem this will solve",
              disabled: isLoading,
            },
          },
        }}
        onSubmit={(data) => {
          mutate({
            ...data, boardPath: router?.query.slug as string,
          });
        }}
      >
        <Drawer.Footer>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Idea
          </Button>
        </Drawer.Footer>
      </AutoForm>


    </Drawer.Body>
    <Drawer.Footer>Footer</Drawer.Footer>
  </Drawer.Content>
</Drawer>
  );
}




