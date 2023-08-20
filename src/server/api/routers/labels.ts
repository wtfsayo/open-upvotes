import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const labelsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.label.findMany();
  }),

  create: protectedProcedure
    .input(z.object({ label: z.string().min(1) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.label.create({
        data: { label: input.label, user_id: ctx.session.user.id },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.label.delete({
        where: { id: input.id },
      });
    }
  ),

});
