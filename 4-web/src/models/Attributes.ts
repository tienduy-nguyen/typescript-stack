import { IndexSignature } from './User';

export class Attributes<T extends IndexSignature> {
  constructor(private data: T) {}
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }
  set(update: T): void {
    Object.assign(this.data, update);
  }
}
