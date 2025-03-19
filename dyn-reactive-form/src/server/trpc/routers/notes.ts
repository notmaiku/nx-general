import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { Note } from '../../../note';
import * as fs from 'fs';
import * as path from 'path';

let noteId = 0;
const notes: Note[] = [];
export const noteRouter = router({
  create: publicProcedure
    .input(
      z.object({
        note: z.string(),
      })
    )
    .mutation(({ input }) =>
      notes.push({
        id: noteId++,
        note: input.note,
        createdAt: new Date().toISOString(),
      })
    ),
  list: publicProcedure.query(() => notes),
  getJsonFile: publicProcedure.query(async () => {
    const filePath = path.join(__dirname, '../../../app/data.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input }) => {
      const index = notes.findIndex((note) => input.id === note.id);
      notes.splice(index, 1);
    }),
});
