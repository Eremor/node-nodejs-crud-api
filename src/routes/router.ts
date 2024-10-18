import { IncomingMessage, ServerResponse } from "http";

import { getAllUsers, getUserById } from "../controllers";
import { BASE_USER_PATH } from "../types";
import { send404 } from "../utils";

export const router = (req: IncomingMessage, res: ServerResponse): void => {
  const url = req.url || '';
  const method = req.method || '';
  const [path, userId] = url.split('/').slice(2);

  if (url === BASE_USER_PATH) {
    switch (method) {
      case 'GET':
        getAllUsers(res)
        break;
    
      default:
        send404(res, 'Endpoint not found')
    }
  } else if (url.startsWith(`${BASE_USER_PATH}/`)) {
    switch (method) {
      case 'GET':
        getUserById(req, res, userId)
        break;
    
      default:
        send404(res, 'Endpoint not found')
    }
  } else {
    send404(res, 'Endpoint not found')
  }
}