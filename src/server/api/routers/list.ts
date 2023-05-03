import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const listRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.list.findMany({ where: { userId } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const name = input.name;
      const list = await ctx.prisma.list.create({ data: { name, userId } });
      return list;
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const id = input.id;
      const list = await ctx.prisma.list.delete({ where: { id } });
      return list;
    }),

  getItems: protectedProcedure
    .input(z.object({ listId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { listId } = input;
      const userId = ctx.session.user.id;
      const list = await ctx.prisma.list.findUnique({
        where: {
          id: listId,
        },
        include: {
          items: true,
        },
      });

      return list;
    }),
  addItem: protectedProcedure
    .input(z.object({ name: z.string(), listId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name, listId } = input;
      const userId = ctx.session.user.id;
      const item = await ctx.prisma.item.create({
        data: { name, listId, userId },
      });
      return item;
    }),
  removeItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const item = await ctx.prisma.item.delete({ where: { id } });
      return item;
    }),
});
