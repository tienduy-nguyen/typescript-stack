import { User } from './models/User';
const user = new User({
  id: '1',
  name: 'Haha',
  age: 50,
});
user.on('save', () => {
  console.log(user);
});

user.save();
