import { Badge, Button, Container, Heading, Text } from "@medusajs/ui";
import type { Idea, Label, Upvote } from "@prisma/client";
import { Triangle } from "lucide-react";

type IdeaCardProps = Idea & { upvotes: Upvote[]; labels: Label[] };

function IdeaCard(props: IdeaCardProps) {
  const { title, description, labels, upvotes, id } = props;

  const handleButtonClick = () => {
    console.log("overflown");
  };

  return (
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
            className="absolute top-2 right-2 flex flex-col rounded-md"
          >
            <Triangle size={16} fill="black"/>
            {upvotes.length}
          </Button>
        </Container>
      
  );
}

export default IdeaCard;
