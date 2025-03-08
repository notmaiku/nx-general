import { router } from '../trpc';
import { noteRouter } from './notes';
import { threadRouter } from './thread';

export const appRouter = router({
  note: noteRouter,
  thread: threadRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
