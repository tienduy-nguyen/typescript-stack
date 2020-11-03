// No user interface
function printLabel1(obj: { label: string }) {
  console.log(obj.label);
}
let myObj1 = { size: 10, label: 'Size 10 Object' };
printLabel1(myObj1);

interface LabelledValue {
  label: string;
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 object' };
printLabel(myObj);

//Optional properties
// Đôi khi chúng ta không nhất thiết phải bắt buộc phải có tất cả thuộc tính vả để thể hiện những thuộc tính không bắt buộc cần thêm ? vào cuối biến đó.
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
let mySquare = createSquare({ color: 'black' });

//Readonly Properties
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; error

// TypeScript còn hỗ trợ class ReadonlyArray<T>.
// Class này giống với Array nhưng loại bỏ hết tất cả các hàm thay đổi Object

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error
// ro.push(5); // error
// ro.length = 100; // error
// a = ro; // error

//Cast Readonly array
a = ro as number[];

// Excess Property checks
