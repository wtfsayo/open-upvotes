import { api } from "@/src/utils/api";
import { Label } from "@prisma/client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PlusCircle, Check, Square } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddLabels(props: {
  Alllabels: Label[];
  labels: Label[];
  idea_id: string;
}) {
  const { Alllabels, labels, idea_id } = props;
  const { mutate: addLabel } = api.idea.addLabel.useMutation();
  const { mutate: removeLabel } = api.idea.removeLabel.useMutation();
  const { mutate: createLabel } = api.labels.createLabel.useMutation();

  const [searchLabel, setSearchLabel] = useState("");

  const context = api.useContext();

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className="w-max rounded-full border-dashed  border-slate-200 px-2.5 py-0 text-xs"
        >
          <PlusCircle className="mr-2 h-4 w-4 " />
          Add Labels
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command >
          <CommandInput
            placeholder={"Labels"}
            value={searchLabel}
            onChangeCapture={(e) => setSearchLabel(e.target?.value)}
          />
          <CommandList>
            {!searchLabel ? (
              <CommandEmpty> No Labels Found </CommandEmpty>
            ) : (
              <CommandEmpty
                onClick={() => {
                  createLabel({ label: searchLabel });
                  void context.labels.invalidate();
                  setSearchLabel("");
                }}
              >
                {"Create Label " + "'" + searchLabel + "'"}
              </CommandEmpty>
            )}
            <CommandGroup>
              {Alllabels.map((label, id) => (
                <CommandItem key={label.id}>
                  <div
                    className="flex flex-row items-center gap-1"
                    onClick={() => {
                      labels.some((x: Label) => x.label === label.label)
                        ? removeLabel({ id: idea_id, label_id: label.id })
                        : addLabel({ id: idea_id, label_id: label.id });
                    }}
                  >
                    {labels.some((x: Label) => x.label === label.label) ? (
                      <Check size={16} />
                    ) : (
                      <Square
                        size={16}
                        strokeWidth={1.25}
                        absoluteStrokeWidth
                      />
                    )}{" "}
                    {label.label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
