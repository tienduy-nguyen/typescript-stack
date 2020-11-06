import { IndexSignature } from './User';

export class Attributes<T extends IndexSignature> {
  constructor(private data: T) {}
  get(propName: string): number | string | undefined {
    return this.data[propName];
  }
  set(update: T): void {
    Object.assign(this.data, update);
  }
}
