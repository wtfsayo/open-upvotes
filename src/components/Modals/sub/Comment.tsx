import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Comment(props: {
  username: string;
  comment: string;
  date: string;
  imageSrc?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-secondary/70 p-4 text-sm">
      <div className="flex flex-row items-center gap-2">
        <Avatar className="h-[24px] w-[24px]">
          <AvatarImage src={props.imageSrc} alt={props.username} />
          <AvatarFallback>{props.username.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <p className="font-medium leading-none">{props.username + "\t"}</p>
        <p className=" text-muted-foreground">{props.date}</p>
      </div>
      {props.comment}
    </div>
  );
}
