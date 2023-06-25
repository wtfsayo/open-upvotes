import { z } from "zod";

import { IdeaStatus } from "@prisma/client";
import { randomUUID } from "crypto";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { STATUS } from "@/src/utils/const";

export const ideaRouter = createTRPCRouter({
  idea: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.idea.findUnique({ where: { id: input.id } });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.idea.findMany({
      orderBy: {
          status: 'asc'
    } , include: {upvotes: true, labels:true}});
  }),

 submit: protectedProcedure
 .input(z.object({ title: z.string().min(1), description: z.string().min(1) }))
 .mutation(({ input, ctx }) => { 
    return ctx.prisma.idea.create({data: {id: randomUUID().substring(0,5).toUpperCase(), user_id: String(ctx.session.user.id), status: IdeaStatus.SUGGESTED, ...input}})
 }),
 
 updateStatus: protectedProcedure
  .input(z.object({ id: z.string(), status: z.nativeEnum(IdeaStatus) }))
  .mutation(({ input, ctx }) => {
    return ctx.prisma.idea.update({where: {id: input.id}, data: {status: input.status}})
  }),
  
  addLabel: protectedProcedure
  .input(z.object({ id: z.string(), label_id: z.string() }))
  .mutation(({ input, ctx }) => {
    return ctx.prisma.idea.update({
      where: { id: input.id },
      data: {
        labels: {
          connect: [{ id: input.label_id }]
        }
      }
    });
  }),
  removeLabel: protectedProcedure
  .input(z.object({ id: z.string(), label_id: z.string() }))
  .mutation(({ input, ctx }) => {
    return ctx.prisma.idea.update({
      where: { id: input.id },
      data: {
        labels: {
          disconnect: [{ id: input.label_id }]
        }
      }
    });
  })

  
});
