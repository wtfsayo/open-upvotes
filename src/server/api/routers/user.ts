import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import type { User } from "@prisma/client";

export const userRouter = createTRPCRouter({
 
  sync: protectedProcedure
  .mutation(({ctx}) => {
    if (ctx?.session && ctx.session.user) {
      const { id, provider, imageSrc, username, address } = ctx.session?.user as User;
      (async () => {
        
    
        const userExists = await ctx.prisma.user.findUnique({ where: { id} });
    
        if (userExists) {
          await ctx.prisma.user.update({ where: { id }, data: {id, provider, imageSrc, username, address} });
        } else {
          await ctx.prisma.user.create({ data: {id, provider, imageSrc, username, address} });
        }
      })().catch((error) => {
        console.error('Error in callback:', error);
        // Handle the error appropriately
      });
    }
  })
});
