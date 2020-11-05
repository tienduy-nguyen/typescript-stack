export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';
type Callback = () => void; // A function take no argument and return a void
export class User {
  events: {[key: string]: Callback[]} = {}; // assign key index
  constructor(private data: UserProps) {};
  get(propName: string): number | string {
    return '';
  }
  set(update: UserProps): void{
    Object.assign(this.data, update)
  }
  on(eventName: string, callback: Callback): void{
    const handlers = this.events[eventName] || []; // Calback[] or undefined
    handlers.push(callback);
    this.events[eventName] = handlers;

  }
}
