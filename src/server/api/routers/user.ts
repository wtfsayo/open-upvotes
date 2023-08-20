import type { User } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  sync: protectedProcedure.mutation(({ ctx }) => {
    if (ctx?.session && ctx.session.user) {
      const { id, provider, imageSrc, username, address } = ctx.session
        ?.user as User;
      (async () => {
        await ctx.prisma.user.upsert({
          where: { id },
          update: { provider, imageSrc, username, address },
          create: { id, provider, imageSrc, username, address },
        });
      })().catch((error) => {
        console.error("Error in callback:", error);
        // Handle the error appropriately
      });
    }
  }),
  get: protectedProcedure.query(({ ctx }) => {
    if (ctx?.session && ctx.session.user) {
      return ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          ideas: true,
          comments: true,
          upvotes: true,
          adminBoards: true,
          moderatorBoards: true,
          viewerBoards: true,
        },
      });
    }
  }),
});
