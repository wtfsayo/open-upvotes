import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const ideaRouter = createTRPCRouter({
  idea: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.idea.findUnique({ where: { id: input.id } });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.idea.findMany();
  }),

 submit: protectedProcedure
 .input(z.object({ title: z.string(), description: z.string() }))
 .query(({ input, ctx }) => { 
    return ctx.prisma.idea.create({data: {user_id: String(ctx.session.user.id), ...input}})
 })

  
});
