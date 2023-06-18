import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
  
  import { Textarea } from "@/components/ui/textarea"

export default function SubmitIdea(){
    return(
  
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Submit New Idea</AlertDialogTitle>
      <AlertDialogDescription className="text-md">
        Got an idea? Submit it here and we will consider it for our next sprint.
      </AlertDialogDescription>
      
      <Textarea className="w-full h-[300px] mt-4 resize-none" placeholder="Please explain your idea as a user how would you benefit, what problem this will solve" />
      <p className="text-sm text-muted-foreground">Please explain your idea as a user how would you benefit, what problem this will solve</p>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>

    )
}
