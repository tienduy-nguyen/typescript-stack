// Boolean
let isDone: boolean = false;

//Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

//String
let color: string = 'blue';
color = 'red';
var fullName = 'Bob Bobbington';
var age = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;

//Array
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

//Tuple
// Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.
let x: [string, number];
x = ['hello', 10];

//Enum
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

//Javascript
// var Color;
// (function (Color) {
//     Color[Color["Red"] = 0] = "Red";
//     Color[Color["Green"] = 1] = "Green";
//     Color[Color["Blue"] = 2] = "Blue";
// })(Color || (Color = {}));
// ;
// var c = Color.Green;

//Any
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;

// Void
// Void đại diện cho trường hợp không có kiểu dữ liệu. Hay được sử dụng trong các function không trả về dữ liệu.
function warnUser(): void {
  alert('This is my warning message');
}

//Null and Undefined
let u: undefined = undefined;
let n: null = null;

//Never
// Kiểu Never biểu thị việc không trả về giá trị gì.(Sử dụng cái này có vẻ hơi khó)
function error(message: string): never {
  throw new Error(message);
}

// Nếu trả return kêt quả cảu function trả về kiểu never thì giá trị trả về hàm này cũng kiểu never
function fail(): never {
  return error('Something failed');
}
// Hàm này chạy vong lặp vô hạn cũng không chạy đến cuối cùng
function infiniteLoop(): never {
  while (true) {}
}

// Type assertions
// Ep kieu trong typescript
let someValue: any = 'This is a string';
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;
