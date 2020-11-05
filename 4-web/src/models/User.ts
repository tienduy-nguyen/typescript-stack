import axios, { AxiosResponse } from 'axios';
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';
type Callback = () => void; // A function take no argument and return a void
export class User {
  events: { [key: string]: Callback[] } = {}; // assign key index
  constructor(private data: UserProps) {}
  get(propName: string): number | string {
    return '';
  }
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  //Event
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []; // Calback[] or undefined
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  // Trigger events
  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;
    handlers.forEach((callback) => {
      callback();
    });
  }

  fetch(): void {
    axios
      .get(`http:localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse) => {
        this.set(res.data);
      });
  }
}
