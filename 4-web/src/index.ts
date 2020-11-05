import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';

// GET /users/:id
// Get user by id
axios.get('http://localhost:3000/users/1').then((res: AxiosResponse) => {
  console.log(res.data);
});

// POST /users
// Create new user
axios.post('http://localhost:3000/users', {
  id: uuidv4(),
  name: faker.name.firstName(),
  age: Math.floor(Math.random() * 100),
});
