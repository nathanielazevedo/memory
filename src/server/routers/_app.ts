/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { wordsRouter } from './words';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  words: wordsRouter,
});

export type AppRouter = typeof appRouter;
