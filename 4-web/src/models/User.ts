export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  constructor(private data: UserProps) {};
  get(propName: string): number | string {
    return '';
  }
  set(update: UserProps): void{
    Object.assign(this.data, update)
  }
}
