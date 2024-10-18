import { v4 } from 'uuid';
import { userDB } from '@db';
import { User } from '@types';

export class UserModule {
  private users: User[] = userDB;

  public getAll(): User[] {
    return this.users;
  }

  public getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public create(createDTO: Omit<User, 'id'>): User {
    const newUser: User = {
      id: v4(),
      ...createDTO
    };
    this.users.push(newUser);
    return newUser;
  }

  public update(id: string, updateDTO: Partial<User>): User | undefined {
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