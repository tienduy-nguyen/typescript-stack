import { User } from './models/User';
const user = new User({
  id: '1',
});
const user2 = new User({
  id: '201',
});

user.set({ name: 'New Name', age: 100 });
user2.set({ name: 'User 201', age: 99 });
user.save();
user2.save();
User.fetchAll();
