import { Check, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/src/lib/utils"
import { useEffect, useState } from "react"


export function AddLabels(props: { title: string, options: any[], added: any[], allowNew?: boolean, handle: any }) {
  const { options, title, allowNew = false, added } = props;

  const [selectedValues, setSelectedValues] = useState(added);
  const [isChanged, setIsChanged] = useState(false);

  const isSelected = (option) => selectedValues.some((value) => value.id === option.id);

  const toggleSelection = (option) => {
    if (isSelected(option)) {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.filter((value) => value.id !== option.id)
      );
    } else {
      setSelectedValues((prevSelectedValues) => [...prevSelectedValues, option]);
    }
    setIsChanged(true); 
  };

  const handleUpdateLabels = () => {
   // handle here
    setIsChanged(false); 
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>
              {!allowNew ? "No results found." : "Add New"}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => toggleSelection(option)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      isSelected(option)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check className={cn("h-4 w-4")} />
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {isChanged && ( // Display "Update Labels" command item if isChanged is true
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleUpdateLabels} className="justify-center text-center">
                    Update Labels
                  </CommandItem>
                </CommandGroup>
              </>
            )}
           
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}