import { Eventing } from './Eventing';
import { Sync } from './Sync';

interface PropsDictionary {
  [key: string]: string | number | undefined;
}
export interface UserProps extends PropsDictionary {
  id?: string | number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
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
