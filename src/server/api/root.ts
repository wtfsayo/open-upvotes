import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { ideaRouter } from "./routers/ideas";
import { upvotesRouter } from "./routers/upvotes";
import { commentsRouter } from "./routers/comments";
import { labelsRouter } from "./routers/labels";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  idea: ideaRouter,
  upvote: upvotesRouter,
  comments: commentsRouter,
  labels: labelsRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;
