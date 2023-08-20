import { Check, PlusCircle } from "lucide-react";
import { FocusModal, Input } from "@medusajs/ui"
import { Badge } from "@medusajs/ui";
import { Button } from "@medusajs/ui";
import { DropdownMenu } from "@medusajs/ui";

import { Separator } from "@radix-ui/react-separator";

import { cn } from "@/src/lib/utils";
import type { Dispatch } from "react";
import { useEffect, useState } from "react";
import { Dropdown } from 'react-day-picker';

export function Filter(
  props: {
    title: string;
    options: string[];
    allowNew?: boolean;
    handle: Dispatch<any>;
  },
) {
  const { options, title, allowNew = false, handle } = props;

  const [selectedValues, setSelectedValues] = useState(new Set(options));

  useEffect(() => handle(Array.from(selectedValues)), [selectedValues, handle]);

  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        <Button  className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                
                
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option))
                    .map((option) => (
                      <Badge
                        
                        key={option}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </FocusModal.Trigger>
      <FocusModal.Content className="w-[200px] p-0" >
        <DropdownMenu>
          <Input placeholder={title} />
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              {!allowNew ? "No results found." : "Add New"}
            </DropdownMenu.Item>
            <DropdownMenu.Group>
              {options.map((option) => {
                const isSelected = selectedValues.has(option);
                return (
                  <DropdownMenu.CheckboxItem
                    key={option}
                    onSelect={() => {
                      setSelectedValues(() => {
                        const newSelectedValues = new Set(selectedValues);
                        return selectedValues.has(option)
                          ? (newSelectedValues.delete(option),
                            newSelectedValues)
                          : (newSelectedValues.add(option), newSelectedValues);
                      });
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span>{option}</span>
                  </DropdownMenu.CheckboxItem>
                );
              })}
            </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu>
      </FocusModal.Content>
    </FocusModal>
  );
}
