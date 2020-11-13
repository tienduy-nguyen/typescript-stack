import { formData } from './forms';

const form = document.querySelector('form')!;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = formData(form);
  console.log(data);
});

console.log('Hi there!');
const person: any = {};
console.log(person.speak());
