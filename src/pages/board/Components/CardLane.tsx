import { Card } from "@/components/ui/card";
import IdeaCard from "./IdeaCard";
import { ideaProps } from "@/src/utils/const";

export default function CardLane(props: {title: string, ideas: ideaProps[]}){
    return(
        <Card className="p-4 flex flex-col gap-2 bg-gray-50 w-full h-full overflow-y-auto">
            <div className="h-max px-2 text-left align-middle font-medium rounded-md text-medium bg-slate-200 text-muted-foreground w-max">{props.title}</div>
            
            {props.ideas?.map((idea: ideaProps) => <IdeaCard key={idea.id} {...idea}/>)}

    </Card>
    )
}
