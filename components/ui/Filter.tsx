import { Button, DropdownMenu, Input } from "@medusajs/ui";
import { CheckIcon, Dot } from "lucide-react";
import type { Dispatch } from "react";
import { useState } from "react";

export function Filter(
  props: {
    title: string;
    options: string[];
    allowNew?: boolean;
    handle?: Dispatch<Event>;
  },
) {
  const { options, title } = props;

  const [selectedValues, setSelectedValues] = useState(new Set(options));
  const isSelected = (option: string) => selectedValues.has(option);
  const [inputValue, setInputValue] = useState<string>("");
  console.log(selectedValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedValues(
      new Set(
        options.filter((option: string) =>
          option.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      ),
    );
  };

  const toggleFromSet = (option: string) => {
    if (isSelected(option)) {
      setSelectedValues((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.delete(option);
        return newSet;
      });
    } else {
      setSelectedValues((prevSet) => new Set(prevSet).add(option));
    }
  };

  console.log(inputValue);
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button>Filter</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <Input
          placeholder={title}
          value={inputValue}
          onChange={handleChange}
          autoFocus
        />
        {options?.map((option: string) => (
          <DropdownMenu.Item key={option} onClick={() => toggleFromSet(option)}>
            {" "}
            {isSelected(option) ? (
              <CheckIcon size={16} className="mr-2" />
            ) : (
              <Dot size={16} className="mr-2" />
            )}{" "}
            {option}{" "}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
