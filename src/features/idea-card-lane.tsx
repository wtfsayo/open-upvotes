import { Badge, Container } from "@medusajs/ui";
import type { ideaProps } from "@/src/utils/const";
import React from "react";
import IdeaCard from "./Modals/Ideas/idea-card";

export default function ContainerLane(
  props: {
    title: string;
    ideas: ideaProps[];
  },
) {
  const { title, ideas } = props;


  return (
    <Container className="flex h-max w-full flex-col space-y-4 overflow-y-auto  rounded-lg border bg-background p-4 shadow-none">
      <Badge color={'blue'} className="w-max">{title}</Badge>

      {Boolean(ideas.length) &&
        ideas?.map((idea: ideaProps) => (
          <React.Fragment key={idea.id}>
            <IdeaCard {...idea} id={idea.id} />
          </React.Fragment>
        ))}
      {!ideas.length && (
        <p className="text-sm font-light text-muted-foreground">
          {" "}
          No Ideas under {title}
        </p>
      )}
    </Container>
  );
}
