import type { Idea, Upvote, Label } from "@prisma/client";
import { IdeaStatus } from "@prisma/client";
export type ideaProps = Idea & { upvotes: Upvote[]; labels: Label[] };
export const STATUS: IdeaStatus[] = Object.values(IdeaStatus);
