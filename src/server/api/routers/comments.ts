import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { randomUUID } from "crypto";

export const commentsRouter = createTRPCRouter({
  getByIdea: publicProcedure
    .input(z.object({ ideaId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.comment.findMany({
        include: { user: true },
        where: { idea_id: input.ideaId },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  createComment: protectedProcedure
    .input(
      z.object({
        ideaId: z.string(),
        comment: z.string().min(1),
        time: z.date(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.comment.create({
        data: {
          id: randomUUID(),
          comment: input.comment,
          time: input.time,
          idea_id: input.ideaId,
          user_id: String(ctx.session.user.id),
        },
      });
    }),
});
