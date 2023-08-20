import { cn } from "@/src/lib/utils";
import { api } from "@/src/utils/api";
import { Button, DropdownMenu, FocusModal, Input } from '@medusajs/ui';
import type { Label } from "@prisma/client";
import { Check, PlusCircle } from "lucide-react";
import { useState } from "react";

export function AddLabels(
  props: {
    title: string;
    options: any[];
    added: any[];
    allowNew?: boolean;
    handle: any;
    ideaId: string;
  },
) {
  const { options, title, allowNew = false, added, ideaId } = props;

  const [selectedValues, setSelectedValues] = useState(added);
  const [isChanged, setIsChanged] = useState(false);
  const { mutate } = api.idea.updateLabels.useMutation();
  const isSelected = (option: Label) =>
    selectedValues.some((value: Label) => value.id === option.id);

  const toggleSelection = (option: Label) => {
    if (isSelected(option)) {
      setSelectedValues((prevSelectedValues: Label[]) =>
        prevSelectedValues.filter((value: Label) => value.id !== option.id),
      );
    } else {
      setSelectedValues((prevSelectedValues: Label[]) => [
        ...prevSelectedValues,
        option,
      ]);
    }
    setIsChanged(true);
  };

  const handleUpdateLabels = () => {
    // handle here
    mutate({
      ideaId: ideaId,
      labelIds: selectedValues.map((value: Label) => value.id),
    });
    setIsChanged(false);
  };

  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        <Button  className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </FocusModal.Trigger>
      <FocusModal.Content className="w-[200px] p-0">
        <DropdownMenu>
          <Input placeholder={title} />
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              {!allowNew ? "No results found." : "Add New"}
              </DropdownMenu.Item>
            <DropdownMenu.Group>
              {options.map((option: Label) => (
                <DropdownMenu.CheckboxItem
                  key={option.id}
                  onSelect={() => toggleSelection(option)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected(option)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <Check className={cn("h-4 w-4")} />
                  </div>
                  <span>{option.label}</span>
                </DropdownMenu.CheckboxItem>
              ))}
            </DropdownMenu.Group>
            {isChanged && ( // Display "Update Labels" command item if isChanged is true
              <>
                <DropdownMenu.Separator />
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    onSelect={handleUpdateLabels}
                    className="justify-center text-center"
                  >
                    Update Labels
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </>
            )}
        </DropdownMenu.Content>
          </DropdownMenu>
      </FocusModal.Content>
    </FocusModal>
  );
}
