import { Eventing } from './Eventing';
import { Sync } from './Sync';

interface PropsDictionary {
  [key: string]: string | number | undefined;
}
export interface UserProps extends PropsDictionary {
  id?: string;
  name?: string;
  age?: number;
}

export class User {
  events: Eventing = new Eventing();
  static allUsers: UserProps[];
  constructor(private data: UserProps) {}
  get(id: string | number): number | string | undefined {
    console.log('data', this.data);
    return this.data[id];
  }
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}
