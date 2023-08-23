import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const boardsRouter = createTRPCRouter({
  getAllByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.board.findMany({
      where: { admin_id: ctx.session.user.id }, // changed from admin_id to adminId
    });
  }),

  createBoard: protectedProcedure
    .input(z.object({ title: z.string().min(1), path: z.string().min(2) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.board.create({
        data: {
          title: input.title,
          path: input.path,
          admin: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAllBoards: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.board.findMany({
      orderBy: {
        title: "asc",
      },
    });
  }),
});
