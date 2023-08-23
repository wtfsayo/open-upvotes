import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button, FocusModal, Heading } from "@medusajs/ui";
import AutoForm from "@/components/ui/auto-form";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { useIdeas } from "./hooks";

const zForm = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

export default function SubmitIdea() {
  const router = useRouter();
  const { submitIdea, submittingIdea: isLoading } = useIdeas();
  const [values, setValues] = useState<Partial<z.infer<typeof zForm>>>({});

  const formRef = useRef<HTMLButtonElement>(null);

  return (
    <FocusModal>
      <FocusModal.Trigger>
        <Button>Submit Idea</Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button disabled={isLoading} onClick={() => formRef.current?.click()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Idea
          </Button>
        </FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <div className="flex w-full max-w-lg flex-col gap-y-8 p-6">
            <div className="flex flex-col gap-y-1">
              <Heading>Submit a new Idea</Heading>
            </div>
            <AutoForm
              values={values}
              onValuesChange={setValues}
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
                submitIdea({
                  ...data,
                  boardPath: (router?.query.slug as string) ?? "/",
                });
              }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                ref={formRef}
                className="hidden"
              >
                Submit Idea
              </Button>
            </AutoForm>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}
