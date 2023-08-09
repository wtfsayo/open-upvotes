import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const upvotesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ ideaId: z.string()})
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.upvote.create({
        data: { idea_id: input.ideaId, user_id: ctx.session.user.id },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({ ideaId: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.upvote.delete({
          where: {
            idea_id_user_id: {
              idea_id: input.ideaId,
              user_id: ctx.session.user.id
            },
          },
        });
      } catch (error) {
        
          throw new Error("Upvote not found");

      }
    }),
});
