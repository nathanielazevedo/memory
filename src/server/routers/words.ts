/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.WordsSelect>()({
  id: true,
  known: true,
  learning: true,
});

export const wordsRouter = router({
  list: publicProcedure.query(async () => {
    const items = await prisma.words.findMany({
      select: defaultPostSelect,
      take: 100,
      where: {},
    });

    return {
      items,
    };
  }),
  add: publicProcedure
    .input(
      z.object({
        known: z.string(),
        learning: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await prisma.words.create({
        data: input,
        select: defaultPostSelect,
      });
      return post;
    }),
});
