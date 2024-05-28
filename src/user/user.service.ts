import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

const users: User[] = [
  {
    userId: 2,
    username: 'maria',
    password: 'guess',
  },
  {
    userId: 1,
    username: 'john',
    password: 'changeme',
  },
];

@Injectable()
export class UserService {
  async findOne(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
