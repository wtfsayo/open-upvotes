import { Badge, Input, Button, DropdownMenu } from "@medusajs/ui";
import React, { useEffect, useRef, useState } from 'react';
import { useMultipleSelection } from 'downshift';
import { openIdea } from '../../src/features/board';
import { PlusCircle } from "lucide-react";

interface TagInputProps {
  possibleTags: string[]
}

const TagInput: React.FC<TagInputProps> = ({ possibleTags }) => {
  const {
    getDropdownProps,
    selectedItems,
    removeSelectedItem,
    setSelectedItems,
  } = useMultipleSelection<string>();

  const ref = useRef<HTMLInputElement>(null);
  
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>(possibleTags);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

    

    switch (event.key) {
      case 'Enter':
      case ',':
      case 'Tab':
        event.preventDefault();
        if(suggestions.includes(event.currentTarget.value) || inputValue) {
            setSelectedItems([...selectedItems, event.currentTarget.value]);
            setInputValue('');
            event.currentTarget.focus();
         
        }
    }
  }

  useEffect(() => {
    setSuggestions(
      possibleTags
        .filter((tag) => tag.toLowerCase().startsWith(inputValue.toLowerCase()))
        .filter((suggestedTag) => !selectedItems.includes(suggestedTag)));
  }, [inputValue, possibleTags, selectedItems]);

  return (
    <div>
      {selectedItems.map((selectedItem) => (
        <Badge color="blue" key={`selected-item-${selectedItem}`} className="mr-2 mb-2">
          <span>{selectedItem}</span>
          <span 
            className="cursor-pointer ml-2"
            onClick={() => removeSelectedItem(selectedItem)}
          >✕</span>
        </Badge>
      ))}
      
      <DropdownMenu >
      <DropdownMenu.Trigger asChild>
     <Button>Add Tags</Button>
        </DropdownMenu.Trigger>
        
        <DropdownMenu.Content>
        <Input
          {...getDropdownProps()}
          placeholder="Add Tags"
          type="search"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          ref={ref}
        />
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <DropdownMenu.Item
                key={`suggestion-${suggestion}`}
                onClick={() => {
                  setSelectedItems([...selectedItems, suggestion]);
                  setInputValue('');
                }}
              >
                {suggestion}
              </DropdownMenu.Item>
            ))
          ) : (
            <DropdownMenu.Item
              onClick={() => {
                setSelectedItems([...selectedItems, inputValue]);
                setInputValue('');
              }}
            >
              <PlusCircle size={16} className="mr-2"/> Add {inputValue}
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};

export default TagInput;
