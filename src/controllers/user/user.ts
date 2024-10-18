import { IncomingMessage, ServerResponse } from 'http';
import { UserModule } from '../../models';

const userModel = new UserModule();

export const getAllUsers = (req: IncomingMessage, res: ServerResponse): void => {
  const users = userModel.getAll();
  res.writeHead(
    200,
    {
      'Content-Type': 'application/json'
    }
  )
  res.end(JSON.stringify(users))
}