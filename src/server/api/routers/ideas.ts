import { z } from "zod";

import { IdeaStatus } from "@prisma/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";



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
  .input(z.object({ title: z.string().min(1), description: z.string().min(1), board_path: z.string().min(1) }))
  .mutation(async ({ input, ctx }) => {
    
    const board = await ctx.prisma.board.findUnique({ where: { path: input.board_path } });
    

    if (!board) {
      return new Error("Board not found");
    }

    return ctx.prisma.idea.create({
      data: {
        title: input.title,
        status: IdeaStatus.SUGGESTED,
        description: input.description,
        board: { connect: { id: board.id } },
        user: { connect: { id: ctx.session.user.id } },
      },
    });
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
  }),
  updateLabels: protectedProcedure
  .input(z.object({ id: z.string(), label_ids: z.array(z.string()) }))
  .mutation(({ input, ctx }) => {
    return ctx.prisma.idea.update({
      where: { id: input.id },
      data: {
        labels: {
          set: input.label_ids.map(id => ({ id }))
        }
      }
    });
  }),
},
);
