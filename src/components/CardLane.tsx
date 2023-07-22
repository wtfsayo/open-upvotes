import { Card } from "@/components/ui/card";
import type { ideaProps } from "@/src/utils/const";
import React from "react";
import IdeaCard from "./IdeaCard";

export default function CardLane(props: { title: string, ideas: ideaProps[] }) {
  const { title, ideas } = props;

  return (
    <Card className="p-4 flex flex-col space-y-2 bg-background w-full h-max overflow-y-auto">
      <div style={{ width: "max-content" }} className="h-max px-2 text-left align-middle font-medium rounded-md text-medium text-muted-foreground">{title}</div>
    
      {Boolean(ideas.length) && ideas?.map((idea: ideaProps) => (
        <React.Fragment key={idea.id}>
          <IdeaCard {...idea} />
        </React.Fragment>
      ))}
      {!ideas.length && <p className="text-sm font-light text-muted-foreground"> No Ideas under {title}</p>}
    </Card>
  );
}
