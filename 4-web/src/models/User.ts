import axios, { AxiosResponse } from 'axios';
export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';
type Callback = () => void; // A function take no argument and return a void
export class User {
  events: { [key: string]: Callback[] } = {}; // assign key index
  private data: UserProps;
  constructor(data: UserProps) {
    this.data = data;
  }
  get(propName: string): number | string {
    return this.data[propName];
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
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        console.log('response', res.data);
        this.set(res.data);
      });
  }
}
