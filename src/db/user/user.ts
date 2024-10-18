import { v4 } from 'uuid';

import { User } from '@types';

export const userDB: User[] = [
  {
    id: v4(),
    username: 'Jon Snow',
    age: 24,
    hobbies: [
      'Know nothing',
      'Keep watch'
    ]
  },
  {
    id: v4(),
    username: 'Sansa Stark',
    age: 19,
    hobbies: [
      'Watch executions',
      'Going to weddings'
    ]
  },
  {
    id: v4(),
    username: 'Eddard Stark',
    age: 47,
    hobbies: []
  }
]