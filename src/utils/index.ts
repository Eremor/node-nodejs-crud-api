import {
  IncomingMessage,
  ServerResponse
} from "http";

import {
  CreateUserDTO,
  UpdateUserDTO,
  User
} from "../types";

export const parseRequestBody = (req: IncomingMessage): Promise<CreateUserDTO | UpdateUserDTO> => {
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

export const send200 = (res: ServerResponse, data: User | User[]) => {
  res.writeHead(
    200,
    {
      'Content-Type': 'application/json'
    }
  );
  res.end(JSON.stringify(data))
}

export const send400 = (res: ServerResponse, message: string = 'Bad Request') => {
  res.writeHead(
    400,
    {
      'Content-Type': 'application/json'
    }
  );
  res.end(JSON.stringify({ message }))
}

export const send404 = (res: ServerResponse, message: string = 'Not Found') => {
  res.writeHead(
    404,
    {
      'Content-Type': 'application/json'
    }
  );
  res.end(JSON.stringify({ message }))
}

export const send500 = (res: ServerResponse, message: string = 'Internal Server Error') => {
  res.writeHead(
    500,
    {
      'Content-Type': 'application/json'
    }
  );
  res.end(JSON.stringify({ message }))
}