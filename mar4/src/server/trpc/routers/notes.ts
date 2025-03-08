// import { z } from 'zod';
// import { publicProcedure, router } from '../trpc';
// import { Note } from '../../../note';
//
// let noteId = 0;
// const notes: Note[] = [];
// export const noteRouter = router({
//   create: publicProcedure
//     .input(
//       z.object({
//         note: z.string(),
//       })
//     )
//     .mutation(({ input }) =>
//       notes.push({
//         id: noteId++,
//         note: input.note,
//         createdAt: new Date().toISOString(),
//       })
//     ),
//   list: publicProcedure.query(() => notes),
//   remove: publicProcedure
//     .input(
//       z.object({
//         id: z.number(),
//       })
//     )
//     .mutation(({ input }) => {
//       const index = notes.findIndex((note) => input.id === note.id);
//       notes.splice(index, 1);
//     }),
// });
//
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db, notes } from '../../../db';
import { eq } from 'drizzle-orm';

export const noteRouter = router({
  create: publicProcedure
    .input(
      z.object({
        note: z.string(),
      })
    )
    .mutation(
      async ({ input }) => await db.insert(notes).values({ note: input.note }).returning()
    ),
  list: publicProcedure.query(async () => {
    const selectedNotes = await db.select().from(notes);
    return selectedNotes.map((note) => ({ ...note, id: +note.id }));
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => await db.delete(notes).where(eq(notes.id, input.id)).returning()),
});
