import { Badge, Input } from "@medusajs/ui";
import React, { ChangeEvent, useRef, useState } from 'react';

const TagInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === ',' || event.key === 'Tab') && inputValue.trim() !== '') {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };
  

  const handleTagClose = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className="flex flex-wrap p-2 border-black border inline-flex items-center"
    >
      <div className="flex flex-wrap items-center">
        {tags.map((tag, index) => (
          <Badge color="blue" key={index} className="mr-2 mb-2 inline-flex items-center">
            <span className="text-white">{tag}</span>
            <span 
              className="text-white cursor-pointer ml-2"
              onClick={() => handleTagClose(tag)}
            >✕</span>
          </Badge>
        ))}
      </div>
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-grow focus:outline-none"
      >

        
      </Input>
    </div>
  )

}

export default TagInput;
