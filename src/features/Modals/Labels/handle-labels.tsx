import React from 'react';
import { DropdownMenu } from '@medusajs/ui';
import { useLabels } from './hooks';
import type { Label } from '@prisma/client';

const modes = ['select', 'create', 'edit']

const Labels = () => {
  const { allLabels } = useLabels();
  const [mode, setMode] = React.useState(modes[0]);
  console.log(mode)
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>Labels</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {allLabels?.map((label: Label) => (
          <DropdownMenu.Item key={label.id}>
            {label.label}
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Item onSelect={() => setMode(modes[2])}>Edit a label</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setMode(modes[1])}>Create label</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default Labels;
