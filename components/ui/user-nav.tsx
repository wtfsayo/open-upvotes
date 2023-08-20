import { LogOut } from "lucide-react";

import { Avatar } from "@medusajs/ui";
import { Button } from "@medusajs/ui";
import { DropdownMenu } from "@medusajs/ui";
import { signOut, useSession } from "next-auth/react";

export function UserNav() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button className="relative h-8 w-8 rounded-full">
        <Avatar
      src={session.data?.user?.imageSrc}
      fallback={session.data?.user?.username?.substring(0, 2) ?? "M"}
/>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-max" align="end" forceMount>
        <DropdownMenu.Label className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.data?.user?.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.data?.user?.address}
            </p>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />

        <DropdownMenu.Separator />
        <DropdownMenu.Item
          onClick={() => {
            signOut().catch((e: Error) => e);
          }}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
