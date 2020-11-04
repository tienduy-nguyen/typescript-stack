interface Foo{
  bar: number;
  bas: string;
}
let foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';

var foo1: any;
var bar = <string> foo1; // bar is now of type "string"

let bar2 = foo1 as string;

interface Foo3 {
  bar: number;
  bas: string;
}
var foo3: Foo3 = {
  // the compiler will provide autocomplete for properties of Foo
};

interface Foo4 {
  bar: number;
  bas: string;
}
var foo4 = <Foo>{
  // the compiler will provide autocomplete for properties of Foo
  // But it is easy for the developer to forget adding all the properties
  // Also this code is likely to break if Foo gets refactored (e.g. a new property added)
};


interface Foo5 {
  bar: number;
  bas: string;
}
var foo5 = {} as Foo5;
// ahhhh .... forget something?

function handler (event: Event) {
  let mouseEvent = event as MouseEvent;
}