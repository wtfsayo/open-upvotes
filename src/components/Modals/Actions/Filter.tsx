import { Check, PlusCircle } from "lucide-react";
import { FocusModal } from "@medusajs/ui"
import { Badge } from "@medusajs/ui";
import { Button } from "@medusajs/ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Separator } from "@radix-ui/react-separator";

import { cn } from "@/src/lib/utils";
import type { Dispatch } from "react";
import { useEffect, useState } from "react";

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
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>
              {!allowNew ? "No results found." : "Add New"}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option);
                return (
                  <CommandItem
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
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </FocusModal.Content>
    </FocusModal>
  );
}
