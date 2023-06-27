import { IdeaStatus, Idea, Upvote, Label } from "@prisma/client"
export type ideaProps = Idea & {upvotes: Upvote[], labels: Label[]}
export const STATUS: IdeaStatus[] = Object.values(IdeaStatus)
