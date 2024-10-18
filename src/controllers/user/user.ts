import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { UserModule } from '../../models';
import {
  parseRequestBody,
  send200,
  send400,
  send404
} from '../../utils';

const userModel = new UserModule();

export const getAllUsers = (res: ServerResponse): void => {
  const users = userModel.getAll();
  send200(res, users);
}

export const getUserById = (res: ServerResponse, userId: string): void => {
  if (!validate(userId)) {
    return send400(res, 'Invalid userId format');
  }

  const user = userModel.getById(userId);

  if (!user) {
    return send404(res, 'User not found')
  }

  send200(res, user);
}

export const createUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    const { username, age, hobbies } = await parseRequestBody(req);

    if (!username || typeof username !== 'string' || !age || typeof age !== 'number' || !hobbies || !Array.isArray(hobbies)) {
      return send400(res, 'Invalid request body. Required username as string, age as number and hobbies as array')
    }

    const newUser = userModel.create({ username, age, hobbies });
    res.writeHead(
      201,
      {
        'Content-Type': 'application/json'
      }
    );
    res.end(JSON.stringify(newUser))
  } catch (error) {
    send400(res, 'Invalid request body')
    console.error(error)
  }
}

export const updateUser = async (req: IncomingMessage, res: ServerResponse, userId: string): Promise<void> => {
  if (!validate(userId)) {
    return send400(res, 'Invalid userId format');
  }

  try {
    const { username, age, hobbies } = await parseRequestBody(req);

    if ((!!username && typeof username !== 'string') || (!!age && typeof age !== 'number') || (!!hobbies && !Array.isArray(hobbies))) {
      return send400(res, 'Invalid request body')
    }

    const updatedUser = userModel.update(userId, { username, age, hobbies });

    if (!updatedUser) {
      return send404(res, 'User not found')
    }

    send200(res, updatedUser)
  } catch (error) {
    send400(res, 'Invalid request body')
    console.error(error)
  }
}

export const deleteUser = (res: ServerResponse, userId: string): void => {
  if (!validate(userId)) {
    return send400(res, 'Invalid userId format');
  }

  const deleted = userModel.delete(userId);

  if (!deleted) {
    return send404(res, 'User not found')
  }

  res.writeHead(204)
  res.end()
}