import { createServer } from 'http';
import { router } from './routes';
import { send500 } from './utils';

export const app = createServer((req, res) => {
  try {
    router(req, res)

    process.on('uncaughtException', (err) => {
      console.log(`Error: ${err.message}`)
      send500(res, 'Internal Server Error')
    })
  } catch {
    send500(res, 'Internal Server Error')
  }
})