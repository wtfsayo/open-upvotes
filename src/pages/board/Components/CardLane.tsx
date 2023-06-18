import { Card } from "@/components/ui/card";
import IdeaCard from "./IdeaCard";

export default function CardLane(props: {title: string}){
    return(
        <Card className="p-4 flex flex-col gap-2 bg-gray-50 w-full">
            <div className="h-max px-2 text-left align-middle font-medium rounded-md text-medium bg-slate-200 text-muted-foreground w-max">{props.title}</div>
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />
            <IdeaCard />

    </Card>
    )
}
