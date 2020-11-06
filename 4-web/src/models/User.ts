import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface IndexSignature {
  [key: string]: string | number | undefined;
}
// In typescript all key objects key are strings
export interface UserProps extends IndexSignature {
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
