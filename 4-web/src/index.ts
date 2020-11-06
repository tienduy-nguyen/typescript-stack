import { User } from './models/User';
const user = new User({
  id: '1',
  name: 'Haha',
  age: 50,
});
user.on('change', () => {
  console.log('change with getter!');
});
user.trigger('change');

const x = user.get('name');
console.log(x);
