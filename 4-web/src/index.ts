import { User } from './models/User';
const user = new User({
  id: '1',
});
const user2 = new User({
  id: '200',
});

user.set({ name: 'New Name', age: 100 });
user2.set({ name: 'User 200', age: 99 });
user.save();
user2.save();
