import request from 'supertest';
import { app } from '../app';
import { CreateUserDTO, UpdateUserDTO } from '../types';

describe('User API', () => {
  let createdUserId: string;

  test('GET /api/users - should return array 3 entries', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(3)
  })

  test('POST /api/users - should create a new user', async () => {
    const newUser: CreateUserDTO = {
      username: 'John Doe',
      age: 35,
      hobbies: ['Gaming', 'Study']
    }

    const res = await request(app).post('/api/users').send(newUser)

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.username).toBe(newUser.username)
    expect(res.body.age).toBe(newUser.age)
    expect(res.body.hobbies).toEqual(newUser.hobbies)

    createdUserId = res.body.id;
  })

  test('GET /api/users/:userId - should return the created user', async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id', createdUserId)
    expect(res.body.age).toBe(35)
  })

  test('PUT /api/users/:userId - should update the user', async () => {
    const updatedUser: UpdateUserDTO = {
      age: 36,
      hobbies: ['Cooking', 'Sleeping']
    }

    const res = await request(app).put(`/api/users/${createdUserId}`).send(updatedUser)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('id', createdUserId);
    expect(res.body.username).toBe('John Doe');
    expect(res.body.age).toBe(updatedUser.age);
    expect(res.body.hobbies).toEqual(updatedUser.hobbies)
  })

  test('DELETE /api/users/:userId - should delete the user', async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`)

    expect(res.status).toBe(204)
  })

  test('GET /api/users/:userId - should return 404 for deleted user', async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`)

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message', 'User not found')
  })

  test('GET /api/users/:userId - should return 400 with invalid id or not uuid', async () => {
    const res = await request(app).get('/api/users/123')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('message', 'Invalid userId format')
  })

  test('should return 404 for non-existing endpoints', async () => {
    const res = await request(app).get('/some-non/existing/resource')

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message', 'Endpoint not found')
  })
})