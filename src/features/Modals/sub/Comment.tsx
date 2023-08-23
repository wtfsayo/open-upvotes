import { Avatar } from "@medusajs/ui";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

export default function Comment(
  props: {
    username: string;
    comment: string;
    date: Date;
    imageSrc?: string;
  },
) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-muted/30 p-4 text-sm">
      <div className="flex flex-row items-center gap-2">
        <Avatar
          src={props.imageSrc}
          fallback={props.username.substring(0, 2)}
        />

        <p className="font-medium leading-none">{props.username + "\t"}</p>
        <p className=" text-muted-foreground">{timeAgo.format(props.date)}</p>
      </div>
      {props.comment}
    </div>
  );
}
