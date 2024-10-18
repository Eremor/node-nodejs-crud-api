import { IncomingMessage } from "http";

export const parseRequestBody = (req: IncomingMessage): Promise<unknown> => {
  return new Promise((res, rej) => {
    let body = '';
    req.on('data', (chunk: Buffer | string) => {
      body += chunk.toString()
    });
    req.on('end', () => {
      try {
        res(JSON.parse(body))
      } catch (error) {
        rej(error)
      }
    })
  })
}