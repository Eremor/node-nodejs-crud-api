import { IncomingMessage, ServerResponse } from 'http';

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from '../controllers';
import { BASE_USER_PATH } from '../types';
import { send404 } from '../utils';

export const router = (req: IncomingMessage, res: ServerResponse): void => {
  const url = req.url || '';
  const method = req.method || '';
  const [path, userId] = url.split('/').slice(2);

  if (url === BASE_USER_PATH) {
    switch (method) {
      case 'GET':
        getAllUsers(res)
        break;
      case 'POST':
        createUser(req, res)
        break;
    
      default:
        send404(res, 'Endpoint not found')
    }
  } else if (url.startsWith(`${BASE_USER_PATH}/`)) {
    switch (method) {
      case 'GET':
        getUserById(res, userId)
        break;
      case 'PUT':
        updateUser(req, res, userId)
        break;
      case 'DELETE':
        deleteUser(res, userId)
        break;
    
      default:
        send404(res, 'Endpoint not found')
    }
  } else {
    send404(res, 'Endpoint not found')
  }
}