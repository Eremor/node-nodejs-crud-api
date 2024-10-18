import { IncomingMessage, ServerResponse } from "http";

import { getAllUsers } from "../controllers";
import { BASE_USER_PATH } from "../types";

export const router = (req: IncomingMessage, res: ServerResponse): void => {
  const url = req.url || '';
  const method = req.method || '';
  const [path, userId] = url.split('/').slice(2);

  if (method === 'GET' && url === BASE_USER_PATH) {
    return getAllUsers(req, res)
  }
}