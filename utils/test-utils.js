import request from 'supertest'

import app from '..'

export const handleLogin = async (data) =>
  await request(app).post('/api/auth/login').send(data)

export const handleCreateContact = async (data, token) =>
  await request(app)
    .post('/api/contact/create')
    .send(data)
    .set({Authorization: token})

export const handleDeleteUser = async (data) =>
  await request(app).delete('/api/user/delete').send(data)

export const handlePostUser = async (data) =>
  await request(app).post('/api/user/register').send(data)

export const loginCredentials = {
  email: 'testuser@gmail.com',
  password: 'testuser123',
}

export const registerCredentials = {
  email: 'testuser125@gmail.com',
  password: 'testuser125',
}

export const contactData = {
  first_name: 'Cecilia',
  last_name: 'Chapman',
  phone_number: '563-7401',
  address: 'Mankato Mississippi 96522',
}
