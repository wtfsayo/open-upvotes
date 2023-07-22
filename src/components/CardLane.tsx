import { Card } from "@/components/ui/card";
import type { ideaProps } from "@/src/utils/const";
import React from "react";
import IdeaCard from "./IdeaCard";

export default function CardLane(props: { title: string; ideas: ideaProps[] }) {
  const { title, ideas } = props;

  return (
    <Card className="flex h-max w-full flex-col space-y-2 overflow-y-auto bg-background p-4">
      <div
        style={{ width: "max-content" }}
        className="text-medium h-max rounded-md px-2 text-left align-middle font-medium text-muted-foreground"
      >
        {title}
      </div>

      {Boolean(ideas.length) &&
        ideas?.map((idea: ideaProps) => (
          <React.Fragment key={idea.id}>
            <IdeaCard {...idea} />
          </React.Fragment>
        ))}
      {!ideas.length && (
        <p className="text-sm font-light text-muted-foreground">
          {" "}
          No Ideas under {title}
        </p>
      )}
    </Card>
  );
}
