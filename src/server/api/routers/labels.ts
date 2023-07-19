import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";



export const labelsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.label.findMany();
  }),

  createLabel: protectedProcedure
    .input(z.object({ label: z.string().min(1) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.label.create({
        data: { label: input.label, user_id: String(ctx.session.user.id) },
      });
    }),
});
