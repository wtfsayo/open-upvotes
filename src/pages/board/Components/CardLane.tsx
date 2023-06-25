import React from "react";
import { Card } from "@/components/ui/card";
import IdeaCard from "./IdeaCard";
import { ideaProps } from "@/src/utils/const";

export default function CardLane(props: { title: string, ideas: ideaProps[] }) {
  const { title, ideas } = props;

  return (
    <Card className="p-4 flex flex-col space-y-2 bg-gray-50 w-full h-full overflow-y-auto">
      <div style={{ width: "max-content" }} className="h-max px-2 text-left align-middle font-medium rounded-md text-medium bg-slate-200 text-muted-foreground">{title}</div>

      {ideas?.map((idea: ideaProps) => (
        <React.Fragment key={idea.id}>
          <IdeaCard {...idea} />
        </React.Fragment>
      ))}
    </Card>
  );
}
