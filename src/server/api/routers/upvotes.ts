import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const upvotesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ ideaId: z.string(), userId: z.string() })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.upvote.create({
        data: { idea_id: input.ideaId, user_id: input.userId },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({ ideaId: z.string(), userId: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.upvote.delete({
          where: {
            idea_id_user_id: {
              idea_id: input.ideaId,
              user_id: input.userId,
            },
          },
        });
      } catch (error) {
        if (error?.code === 'P2025') {
          throw new Error("Upvote not found");
        }
        throw error;
      }
    }),
});
