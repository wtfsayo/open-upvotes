import { LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"

export function UserNav() {

  const session = useSession();
  

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        
          <Avatar className="h-9 w-9 ">
          {session.data?.user?.imageSrc && <AvatarImage src={session.data?.user?.imageSrc} alt={session.data?.user?.username} />}
            <AvatarFallback className="bg-slate-300">{session.data?.user?.username.substring(0,2)}</AvatarFallback>
          </Avatar>
          
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.data?.user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
            {session.data?.user?.address}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          signOut().catch((e:Error) => e)
           }} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}