// Primitive type

let num = 123;
let str = 'somestring';
let isNumber = true;

let num2: number;
let str2: string;
let isNumber2: boolean;

// Array
let arr1: string[];
let arr2: boolean[];
let arr3: number[];


// Union type
function formatCommandline(command: string[]|string) {
  var line = '';
  if (typeof command === 'string') {
      line = command.trim();
  } else {
      line = command.join(' ').trim();
  }

  // Do stuff with line: string
}

// Intersection type
function extend<T, U>(first: T, second: U): T & U {
  return { ...first, ...second };
}

const x = extend({ a: "hello" }, { b: 42 });

// x now has both `a` and `b`
const first = x.a;
const second = x.b;

// Tuple type
// Array contains any type of members
// tuple cho phép bạn khai báo mảng với các giá trị có kiểu dữ liệu mà bạn đã biết. Như ví dụ dưới đây
let nameNumber: [string, number];

// Okay
nameNumber = ['Jenny', 8675309];

// Error!
// nameNumber = ['Jenny', '867-5309'];