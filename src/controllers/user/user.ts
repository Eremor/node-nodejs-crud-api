import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { UserModule } from '../../models';
import { send200, send400, send404 } from '../../utils';

const userModel = new UserModule();

export const getAllUsers = (res: ServerResponse): void => {
  const users = userModel.getAll();
  send200(res, users);
}

export const getUserById = (req: IncomingMessage, res: ServerResponse, userId: string): void => {
  if (!validate(userId)) {
    return send400(res, 'Invalid userId format');
  }

  const user = userModel.getById(userId);

  if (!user) {
    return send404(res, 'User not found')
  }

  send200(res, user);
}