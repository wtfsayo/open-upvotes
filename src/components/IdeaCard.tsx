import { Badge, Button, Container, Drawer } from "@medusajs/ui";
import type { Idea, Label, Upvote } from "@prisma/client";

import { useMemo } from "react";
import IdeaDetails from "./Modals/IdeaDetails";


const MAX_TITLE_LENGTH = 160;
const MAX_DESCRIPTION_LENGTH = 100;

type IdeaCardProps = Idea & { upvotes: Upvote[]; labels: Label[] };

function IdeaCard(props: IdeaCardProps) {
  const { title, description, labels, upvotes, id } = props;

  const truncatedTitle = useMemo(
    () => title.substring(0, MAX_TITLE_LENGTH) + "...",
    [title],
  );
  const truncatedDescription = useMemo(
    () => description.substring(0, MAX_DESCRIPTION_LENGTH) + "...",
    [description],
  );

  const handleButtonClick = () => {
    console.log("overflown");
  };

  return (
    <Drawer>
      <Drawer.Trigger>
        <Container className="w-full pt-2 pb-2 relative rounded-md bg-muted/10 hover:cursor-pointer shadow-none hover:bg-muted/20">
          <Drawer.Header>
          <Drawer.Title>
              {truncatedTitle}
              </Drawer.Title>
            <Drawer.Description>
              {truncatedDescription}
              </Drawer.Description>
            {Boolean(labels.length) && (
              <div className="gap-1 m-1">
                {labels.map((label: Label) => (
                  <Badge key={label.label}>
                    {label.label}
                  </Badge>
                ))}
              </div>
            )}
          </Drawer.Header>

          
          <Button
              onClick={handleButtonClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 16a1 1 0 0 1-.8-1.6l6-8a1 1 0 0 1 1.6 0l6 8A1 1 0 0 1 18 16H6Z"
                />
              </svg>
              {upvotes.length}
            </Button>
          
        </Container>
      </Drawer.Trigger>
      <Drawer.Content>
      <IdeaDetails key={props.id} {...props} />
      </Drawer.Content>
    </Drawer>
  );
}

export default IdeaCard;
