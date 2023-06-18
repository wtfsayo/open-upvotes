import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function IdeaCard() {
    return (
      <Card className="w-full hover:bg-gray-50 pt-2">
        <CardHeader className="flex flex-row justify-between items-center p-3">
          
          <CardTitle className="text-md font-medium leading-none">{'Hello this is my idea and its very good'.substring(0,60) + '...'}</CardTitle>
          
        </CardHeader>
        
        <CardContent className="p-3">
          <CardDescription className="text-sm font-light text-muted-foreground">
              {'Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.'.substring(0,100) + '...'}
          </CardDescription>
          
           </CardContent>
           <CardFooter className="flex justify-between p-3">
          <div>
        <Badge variant={'secondary'}>Important</Badge>
        <Badge variant={'secondary'}>Considering</Badge>
        <Badge variant={'secondary'}>To-do</Badge>
        </div>
        
        </CardFooter>
           <CardContent className="flex flex-row gap-1 p-3">
           <Button variant={'outline'} className="w-full bg-transparent">
  
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 16a1 1 0 0 1-.8-1.6l6-8a1 1 0 0 1 1.6 0l6 8A1 1 0 0 1 18 16H6Z"/></svg>
              Upvote
  </Button>
  <Button variant={'ghost'} onClick={() => console.log('overflown')}><MoreVertical size={17}/></Button>
              </CardContent>
        
      </Card>
    )
  }
  