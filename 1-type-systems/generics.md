# Generics

- [Generics](#generics)
  - [Generics](#generics-1)
  - [Motivation and samples](#motivation-and-samples)
  - [Design pattern: Convenience generic](#design-pattern-convenience-generic)

## Generics

The key motivation for generics is to document meaningful type dependencies between members. The members can be:
- Class instance members
- Class methods
- function arguments
- function return value

## Motivation and samples

Consider the simple `Queue`(first in, first out) data structure implementation. A simple one in TypeScript/ Javascript looks like:

```ts
class Queue{
  private data = [];
  push(item){this.data.push(item)}
  pop(){return this.data.shift()}
}

```

One issue with this implementation is that it allows people to add anything to the queue and when they pop it - it can be anything. This is shown below, where someone can push a string onto the queue while the usage actually assumes that only numbers were pushed in:

```ts
class Queue {
  private data = [];
  push(item) { this.data.push(item); }
  pop() { return this.data.shift(); }
}

const queue = new Queue();
queue.push(0);
queue.push("1"); // Oops a mistake

// a developer walks into a bar
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
```

One solution (and in fact the only one in languages that don't support generics) is to go ahead and create special classes just for these constraints.

```ts
class QueueNumber extend Queue{
  push(item: number){super.push(item)}
  pop(): number{return this.data.shift()}
}

const queue = new QueueNumber();
queue.push(0);
queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

// ^ if that error is fixed the rest would be fine too
```

Of course this can quickly become painful e.g. if you want a string queue you have to go through all that effort again. What you really want is a way to say that whatever the type is of the stuff getting pushed it should be the same for whatever gets popped. This is done easily with a generic parameter (in this case, at the class level):

```ts
class Queue<T>{
  private data = [];
  push(item: T){this.data.push(item);}
  pop(): T | undefined{return this.data.shift();}
}
/** Again sample usage */
const queue = new Queue<number>();
queue.push(0);
queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

```

Another example that we have already seen is that of a reverse function, here the constraint is between what gets passed into the function and what the function returns:
```ts
function reverse<T>(items: T[]): T[] {
  let result =  [];
  for(let i = items.length-1; i>=0; i--){
    result.push(items[i])
  }
  return result;
}
var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // 3,2,1

// Safety!
reversed[0] = '1';     // Error!
reversed = ['1', '2']; // Error!

reversed[0] = 1;       // Okay
reversed = [1, 2];     // Okay
```

In this section you have seen examples of generics being defined at class level and at function level. One minor addition worth mentioning is that you can have generics created just for a member function. As a toy example consider the following where we move the reverse function into a Utility class:

```ts
class Utility {
  reverse<T>(items: T[]): T[] {
      var result = [];
      for (let i = items.length - 1; i >= 0; i--) {
          result.push(items[i]);
      }
      return result;
  }
}
```
`TIP: You can call the generic parameter whatever you want. It is conventional to use T, U, V when you have simple generics. If you have more than one generic argument try to use meaningful names e.g. TKey and TValue (conventional to prefix with T as generics are also called templates in other languages e.g. C++).`

## Design pattern: Convenience generic

Consider the function

```ts
function parse<T>(name: string): T;
```

A more obvious example is a function that loads a json response. It returns a promise of whatever type you pass in:
```ts
const getJSON = <T>(config: {
    url: string,
    headers?: { [key: string]: string },
  }): Promise<T> => {
    const fetchConfig = ({
      method: 'GET',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(config.headers || {})
    });
    return fetch(config.url, fetchConfig)
      .then<T>(response => response.json());
  }
```
`Note` that you still have to explicitly annotate what you want, but the getJSON<T> signature (config) => Promise<T> saves you a few key strokes (you don't need to annotate the return type of loadUsers as it can be inferred):

```ts
type LoadUsersResponse = {
  users: {
    name: string;
    email: string;
  }[];  // array of user objects
}
function loadUsers() {
  return getJSON<LoadUsersResponse>({ url: 'https://example.com/users' });
}
```

Also `Promise<T>` as a return value is definitely better than alternatives like `Promise<any>.`
Another example is where a generic is only used as an argument:
```ts
declare function send<T>(arg: T): void;
```
Here the generic T can be used to annote the type that you want the argument to match e.g.

```ts
send<Something>({
  x:123,
  // Also you get autocomplete  
}); // Will TSError if `x:123` does not match the structure expected for Something
```