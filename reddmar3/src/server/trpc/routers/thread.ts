
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db, threads } from '../../../db';
import { eq } from 'drizzle-orm';

export const threadRouter = router({
  list: publicProcedure.query(async () => {
    const selectedthreads = await db.select().from(threads);
    return selectedthreads.map((note) => ({ ...note, id: +note.id }));
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => await db.delete(threads).where(eq(threads.id, input.id)).returning()),
});

