import { z } from "zod";

import { IdeaStatus } from "@prisma/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const ideaRouter = createTRPCRouter({
  idea: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.idea.findUnique({ 
        where: { id: input.id },
        include: { labels: true, upvotes: true, comments: true },
       });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.idea.findMany({
      orderBy: { createdAt: "desc" },
      include: { labels: true, upvotes: true, board: true, user: true },
    });
  }),

  getAllByBoard: publicProcedure
    .input(z.object({ boardPath: z.string() }))
    .query(async ({ ctx, input }) => {
      const board = await ctx.prisma.board.findUnique({ where: { path: input.boardPath } });

      if (!board) {
        throw new Error("Board not found");
      }

      return ctx.prisma.idea.findMany({
        where: { board_id: board.id },
        orderBy: { createdAt: "desc", status: "asc" },
        include: { upvotes: true, labels: true, user: true },
      });
    }),

  submit: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        boardPath: z.string().min(1),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const board = await ctx.prisma.board.findUnique({ where: { path: input.boardPath } });

      if (!board) {
        throw new Error("Board not found");
      }

      return ctx.prisma.idea.create({
        data: {
          title: input.title,
          status: IdeaStatus.SUGGESTED,
          description: input.description,
          board_id: board.id,
          user_id: input.userId,
        },
      });
    }),

  updateStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.nativeEnum(IdeaStatus) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.idea.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  addLabel: protectedProcedure
    .input(z.object({ ideaId: z.string(), labelId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.idea.update({
        where: { id: input.ideaId },
        data: {
          labels: {
            connect: [{ id: input.labelId }],
          },
        },
      });
    }),
    
  removeLabel: protectedProcedure
    .input(z.object({ ideaId: z.string(), labelId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.idea.update({
        where: { id: input.ideaId },
        data: {
          labels: {
            disconnect: [{ id: input.labelId }],
          },
        },
      });
    }),

  updateLabels: protectedProcedure
    .input(z.object({ ideaId: z.string(), labelIds: z.array(z.string()) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.idea.update({
        where: { id: input.ideaId },
        data: {
          labels: {
            set: input.labelIds.map((id) => ({ id })),
          },
        },
      });
    }),
});
