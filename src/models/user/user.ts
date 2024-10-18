import { v4 } from 'uuid';

import {
  CreateUserDTO,
  UpdateUserDTO,
  User
} from '../../types';
import { userDB } from '../../db';

export class UserModule {
  private users: User[] = userDB;

  public getAll(): User[] {
    return this.users;
  }

  public getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public create(createDTO: CreateUserDTO): User {
    const newUser: User = {
      id: v4(),
      ...createDTO
    };
    this.users.push(newUser);
    return newUser;
  }

  public update(id: string, updateDTO: UpdateUserDTO): User | undefined {
    const index: number = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return undefined;
    };
    this.users[index] = {
      ...this.users[index],
      ...updateDTO
    };
    return this.users[index];
  }

  public delete(id: string): boolean {
    const index: number = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    };
    this.users.splice(index, 1);
    return true;
  }
}