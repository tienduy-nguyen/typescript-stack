import { User } from './models/User';
const user = new User({
  id: '200',
});

console.log('user before update', { ...user });
user.fetch();
setTimeout(() => {
  console.log('user after update', user);
}, 4000);
