import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const upvotesRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ idea_id: z.string() }))
    .mutation(({input, ctx}) => {
      return ctx.prisma.upvote.create({data: {idea_id: input.idea_id, user_id: String(ctx.session.user.id)}})
    }),

  delete: protectedProcedure
    .input(z.object({ idea_id: z.string() }))
    .mutation(({input, ctx}) => {
      if (ctx.prisma.upvote.findUnique({where: {idea_id_user_id: {idea_id: input.idea_id, user_id: String(ctx.session.user.id)}}}) != null) {
      return ctx.prisma.upvote.delete({where: {idea_id_user_id: {idea_id: input.idea_id, user_id: String(ctx.session.user.id)}}})
    } else return 
            throw new Error("You have not upvoted this idea")
    }),
})
