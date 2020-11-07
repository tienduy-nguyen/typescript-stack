# Decorator

- [Decorator](#decorator)
  - [Decorator](#decorator-1)
  - [Decorator factory](#decorator-factory)
  - [Class decorator](#class-decorator)
  - [Ví dụ](#ví-dụ)
  - [Method decorator](#method-decorator)
  - [Thứ tự decorator](#thứ-tự-decorator)
  - [Accessor decorator](#accessor-decorator)
  - [Reference](#reference)


Kể từ ES6, Class đã xuất hiện trong javascript.

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

Đi kèm theo đó, trong quá trình phát triển, sẽ có nhiều trường hợp mà ta thấy cần phải thêm thông tin hoặc chỉnh sửa các class hoặc thành phần của class (property, method ...), đặc biệt ở run-time. Lúc này, `Decorators`, `Metadata Reflection` xuất hiện và cung cấp các phương thức cho phép ta thêm vào các chú thích hoặc meta-data cho class, property, method ...

`Decorator được hứa hẹn sẽ là 1 một của javascript (kể từ ES 7), tuy nhiên typescript đã đi trước với việc hỗ trợ từ đầu Decorator (vốn là 1 tính năng được sử dụng khá nhiều trong C#, một ngôn ngữ cũng do Microsoft phát triển). Trong bài này, ta sẽ tìm hiểu cách sử dụng decorator trong typescript.`


## Decorator

`Decorator` có thể coi như một cú pháp khai báo đặc biệt, không bao giờ đứng độc lập mà luôn được gắn kèm với một khai báo class, method, property hoặc accessor. `Decorator` được viết dưới cú pháp dạng `@expression`, với `expression` trỏ tới một function sẽ được gọi tới ở runtime, có nhiệm vụ thay đổi hoặc bổ sung cho đối tượng được decorate.

Trong javascript thuần từ trước phiên bản ES6, khái niệm `decorator` cũng đã xuất hiện dưới dạng "functional composition" - bao bọc 1 function với 1 function khác. Ví dụ: khi ta gần ghi log lại hoạt động của 1 function , ta có thể tạo 1 `decorator` function bao bọc lấy function cần thực hiện.

```js
function doBusinessJob(arg) {
  console.log('do my job');
}

function logDecorator(job) {
  return function() {
    console.log('start my job');
    const result = job.apply(this, arguments);
    return result;
  }
}

const logWrapper = logDecorator(doBusinessJob);
```


function được gói trong logWrapper được gọi y hệt như với doBusinessJob, với điểm khác biệt là nó sẽ thực hiện thêm việc ghi log trước khi business được thực hiện.

```js
doBusinessJob();
// do my job
logDecorator();
// start my job
// do my job
```

Tương tự như trên, trong typescript, @expression thực chất cũng là một function:

```js
function expression(target) {
   // do something with target 
}
```

## Decorator factory

Để customize cách mà 1 decorator được apply vào target của nó, hoặc truyền params cho decorator, ta có thể sử đụng `decorator factory` thực chất cũng lại là 1 function, trả về 1 expression mà sẽ được decorator gọi tới ở run-time.

```ts
function customDecorator(value: integer) {   // => decorator factory
  return function (target): void {           // => decorator
     // do something with decorated target and input value
  }
}

```


Trong Typescript, có 5 loại decorator:

- class decorator
- method decorator
- property decorator
- accessor decorator
- parameter decorator

## Class decorator

Một `Class Decorator` được định nghĩa ngay phía trước định nghĩa của lớp đó.

```ts
@logCreate
class Animal{}
```

Tương ứng với nó, decorator function sẽ nhận 1 params `constructor` của class được decorate. ex:

```ts
function logCreate(Class){
  return function(...args){
      console.log('Object created with args: ', args);
      return new Class(...args);
  }
}
```

decorator trên sẽ log ra mỗi khi có 1 instance mới của class được khởi tạo.

```ts
@logCreate
class Animal {
  constructor(footCount) {}
}

const dog = new Animal(4);
// => Object created with args: 4
```
Để ý ta thấy: params Class của `logCreate` chính là class đầu vào. Như vậy, nếu ta muốn truyền thêm parameter vào decorator thì sao ?


=> Sử dụng decorator factory:

```ts
function logCreate(additionalParam) {
  return function actualDecorator(Class) {
    return function(...args) {
      console.log('Object created with args: ', args, '; and receive another params: ', additionalParam);
      return new Class(...args);
    }    
  }
}

@logCreate('custom')
class Animal {
  constructor(footCount) {}
}

const dog = new Animal(4);
// => Object created with args: 4; and receive another params: custom

```

## Ví dụ
Vậy chứ tóm lại thì cái đống lằng nhằng ở trên có tác dụng gì?

Thực tế, trong Angular2, đây là loại decorator được thấy (và sử dụng) nhiều nhất với hàng loạt tính năng của Angualar được xây dựng và sử dụng thông qua decorator: Component, Module...

```ts
// Component được khai báo thông qua decorator

@Component({
  selector: '',
  templateUrl: ''
})

export class MyComponent {}

//ngModule cũng được khai báo thông qua decorator
@ngModule({
  exports: [],
  imports:[]
})
export class MyModule{}
```

## Method decorator

Khác với Class decorator , Method decorator được khai báo với 3 params:

param đầu tiên sẽ là:

- target : Class chứa cái method đó.
- tên của member được decorate ( mà đối với method decorator thì là tên của method)
  
Property Descriptor của method.
Quay trở lại với ví dụ về logDecorator ở đầu bài. Bây giờ, ta đã có thể viết ngắn gọn hơn rất nhiều.

```ts
function logDecorator(target: any, key: string, descriptor: any) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log('start my job');
    return originalMethod.apply(this, args);
  }

  return descriptor;
}

///////////////

@logDecorator
function doBusinessJob(arg) {
  console.log('do my job');
}

doBusinessJob();
// start my job
// do my job
```

## Thứ tự decorator

Ta hoàn toàn có thể apply nhiều decorator cho 1 đối tượng

```ts
@deco1
@deco2
const myFunction = ()=>{}
```

Khi đó, các decorator sẽ được thực hiện tuần tự từ trên xuống dưới. Đồng thời, result đầu ra của decorator (object đã được chỉnh sửa) của decorator phía dưới sẽ trở thành đầu vào của decorator phía trên.

```ts
function deco1() {
    console.log("deco1(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("deco1(): called");
    }
}

function deco2() {
    console.log("deco2(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("deco2(): called");
    }
}

class C {
    @deco1()
    @deco2()
    method() {}
}
```

Nếu ta gọi hàm `method()` => in ra theo thứ tự:

```ts
// deco1(): evaluated
// deco2(): evaluated
// deco2(): called
// deco1(): called
```

## Accessor decorator

Tương tự với `ethod decorator`, `accessor decorator` dùng để decorate cho accessor của 1 property nào đó.

```ts
class Demo{
  private _name: string;
  @modify
  get name(): string{
    return `${this._name}`
  }
}

```

Chú ý: Với accessor decorator, ta chỉ định nghĩa decorate với accessor nào (get hoặc set) được viết trước tiên.

```ts
@modify
get name(): string {
}

// không viết @modify ở đây nữa !
set name(input: string): void {
}
```

## Reference
[Ref](https://viblo.asia/p/typescript-decorator-va-metadata-reflection-m68Z0w2dKkG)