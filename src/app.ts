import { createServer } from 'http';
import { router } from './routes';

export const app = createServer((req, res) => {
  router(req, res)
})