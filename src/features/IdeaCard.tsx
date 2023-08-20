import { Badge, Button, Container, Drawer, Heading, Text } from "@medusajs/ui";
import type { Idea, Label, Upvote } from "@prisma/client";
import IdeaDetails from "./Modals/Ideas/idea-details";

type IdeaCardProps = Idea & { upvotes: Upvote[]; labels: Label[] };

function IdeaCard(props: IdeaCardProps) {
  const { title, description, labels, upvotes, id } = props;

  const handleButtonClick = () => {
    console.log("overflown");
  };

  return (
    <Drawer>
      <Drawer.Trigger>
        <Container className="relative w-full rounded-md bg-muted/10 p-2 text-left shadow-none hover:cursor-pointer hover:bg-muted/20">
          <Heading>{title}</Heading>
          <Text className="text-muted-foreground">{description}</Text>
          {Boolean(labels.length) && (
            <div className="m-1 gap-1">
              {labels.map((label: Label) => (
                <Badge key={label.label}>{label.label}</Badge>
              ))}
            </div>
          )}

          <Button
            onClick={handleButtonClick}
            className="absolute top-2 right-2 flex flex-col"
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
