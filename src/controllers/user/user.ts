import { IncomingMessage, ServerResponse } from 'http';
import { UserModule } from '../../models';
import { send200 } from '../../utils';

const userModel = new UserModule();

export const getAllUsers = (res: ServerResponse): void => {
  const users = userModel.getAll();
  send200(res, users);
}