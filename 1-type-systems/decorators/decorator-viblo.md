# Decorator

- [Decorator](#decorator)
  - [Decorator](#decorator-1)
  - [Decorator factory](#decorator-factory)
  - [Class decorator](#class-decorator)
  - [Ví dụ](#ví-dụ)
  - [Method decorator](#method-decorator)
  - [Thứ tự decorator](#thứ-tự-decorator)
  - [Accessor decorator](#accessor-decorator)
  - [Propety decorator](#propety-decorator)
  - [Parameter decorator](#parameter-decorator)
  - [Metadata REflection](#metadata-reflection)
  - [Ví dụ 1: Validate cho params của method.](#ví-dụ-1-validate-cho-params-của-method)
  - [Ví dụ 2: Complex types serialization từ JSON.](#ví-dụ-2-complex-types-serialization-từ-json)
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


## Propety decorator

Khác với `method decorator` và `accessor decorator`, `property decorator` sẽ chỉ có 2 params đầu vào : `Property Descriptor` không được truyền vào như 1 argument của `property decorator`

Decorator dạng này có khá nhiều công dụng hay ho : ta có thể dùng nó cùng với Metadata để chỉnh sửa, can thiệp vào property của object. (ví dụ vào cuối bài)

## Parameter decorator

Decorator loại này được định nghĩa ngay trước 1 parameter - có thể là 1 param của 1 function hoặc của constructor của Class.

Parameter decorator nhận đầu vào là 3 params

class đầu vào.
- tên của param được decorate.
- thứ tự của param trong list các params của function cha.
Parameter decorator chỉ được sử dụng để kiểm tra sự tồn tại của params trong function , và thường được dùng kết hợp với method decorator hoặc accessor decorator

## Metadata REflection

Các ngôn ngữ như C#, Java ... đều hỗ trợ metadata cho Class , cũng như các hàm API để đọc và ghi metadata cho Class.

Việc đọc , ghi metadata này rất hữu ích khi ta muốn thực hiện logic dựa trên việc kiểm tra thông tin về kiểu (type inference) của class cũng như property trong run-time.

Hiện tại, javascript thuần hỗ trợ type inference rất nghèo nàn 😦 với chỉ một số quen thuộc:

- `typeof` và `instanceof` (trả về kiểu của object được kiểm tra)
- `Object.getOwnPropertyDescriptor()` , `Object.keys()` (trả về danh sách các property hay key của object)
  
Tương tự với việc Decorator được hứa hẹn sẽ xuất hiện chính thức trong ES7, `metadata reflection` cũng được hứa hẹn ít nhất sẽ xuất hiện dưới dạng prototype kể từ ES7, và được implement chính thức vào javascript sau.

Tuy nhiên, từ bây giờ, ta có thể sử dụng thư viện `reflect-metadata `để sử dụng các API này. Hiện tại, bộ API này đã hỗ trợ việc đọc và ghi metadata cho đối tượng thông qua các hàm:

- defineMetadata: thêm 1 metadata key cho target.
- hasMetadata: kiểm tra tồn tại của 1 metadata dựa theo key.
- getMetadata : lấy ra 1 metadata dựa theo key.
- deleteMetadata: xóa 1 metadata.
- getMetadataKeys:
  

## Ví dụ 1: Validate cho params của method.

Sử dụng: `parameters decorator`, `method decorator` kết hợp với `metadata reflection`

Thông thường khi viết 1 hàm, nhiều khi ta phải kiểm tra giá trị của các params đầu vào.

```ts
function checkVacation(staff: User, date: DateTime){
  if(staff === undefined) {throw Error;}
  // Logic
}

```

Việc check này thường lặp đi lặp lại và do đó, ta có thể tách logic của các validate thường dùng ra thành decorator. Ở đây ta sử dụng 2 decorator, 1 cho params và 1 cho method được kiểm tra.

```ts
import 'reflect-metadata';
function required(target: Object, propertyKey: string|symbol, paramIndex: number){
    let existingRequiredParams: number[] = Reflect.getOwnMetadata('required', target, propertyKey) || [];
    existingRequiredParams.push(paramIndex);
    Reflect.defineMetadata('required', existingRequiredParams, target, propertyKey);
}
```

Với `parameter decorator` này, đầu tiên ta lấy ra (hoặc khởi tạo) required metadata từ object chứa method. Sau đó ta đẩy index của pấm cần kiểm tra vào metadata này và lưu lại vào Class.

```ts
import "reflect-metadata";

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParams: number[] = Reflect.getOwnMetadata('required', target, propertyName);
        if (requiredParams) {
            for (let parIndex of requiredParams) {
                if (parIndex >= arguments.length || arguments[parIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }

        return method.apply(this, arguments);
    }
}

```

Tiếp sau đó, ở trong `method decorator`, ta lấy ra index của các required params từ metadata. Với từng index, ta kiểm tra giá trị của params tại index đó, nếu bằng undefined => ném ra Exception.

Lúc này, việc sử dụng decorator khi cho code thực thi trở nên ngắn gọn và giúp tập trung hơn vào nghiệp vụ chính.

```ts
@validate
function checkNgayNghi(@required staff: User, date: DateTime) {   
   // ... logic
}
```

Tương tự như thế, ta có thể viết nhiều loại decorator để validate các logic thông thường của biến.

```ts
@format (check format dựa trên regex ...)
@greater_than (các validate sử dụng cho kiểu params dạng number ...)
...
```

## Ví dụ 2: Complex types serialization từ JSON.


Nếu ai code Angular (cũng như Typescript) đều gặp phải tinh huống: khi lấy được dữ liệu từ server , ta cần phải ép kiểu dữ liệu này về dạng Typed Object.

Ta có thể dùng hàm đơn giản sau để ép 1 JSON object về dạng Typed Object.

```ts
export function convertObject<T>(outputType:  {new(): T}, inputItem: Object): T{
if(!!inputItem){return Object.assign(new outputClass(), inputItem)}
}
```

Lúc  này ta có thể ép kiểu như sau:

```ts
class User{
  id: number;
  name: string;
}

const user = {id: 1, name: 'Blob'}

const typeUser = convetObject(User, user)
```

Rắc rối nảy sinh khi JSON đầu vào ta lấy từ server về không chỉ là 1 object đơn thuần, mà có thể dưới dạng nested Object.

```ts
const classRoom = {
   id: 12,
   name: 'IT 101',
   students: [
      { id: 1, name: 'Blob' },
      { id: 2, name: 'Angel' },
      { id: 3, name: 'Mark' },
   ]
}
```


Với hàm convert phía trên, Object.assign sẽ đơn thuần chỉ copy các property của object cũ và assign lại cho object mới , vì vậy kết quả sẽ chỉ ra được như sau

```ts
class ClassRoom {
  id: number;
  name: string;
  students: Array<User>;
}

///
const typedClassRoom = convertObject(ClassRoom, classRoom);

// => ClassRoom { 
//   id: 12, 
//   name: 'IT 101', 
//  students: []    => Các Object trong mảng này vẫn thuộc kiểu Object, không được ép về kiểu User
// }
//
```

Giải pháp: Viết 1 `property decorator` để đánh dấu các propety sẽ được ép kiểu khi convert object.

```ts
class ClassRomm{
  id: number;
  name: string;
  @convertType(User) students: Array<User>;
}

// Việc implement decorator trên khá đơn giản
import 'reflect-metadata';
export function convertType<T>(type: T){
  return function(target: Object, propertyName: string): void{
    Reflect.defineMetadata(propertyName, type, target)
  }
}
```

Decorator trên sẽ thwucj hiện nhiệm vụ: khi gặp 1 property được đánh dấu, nó sẽ lưu 1 cặp (key, value) vào metadata của Class dó với giá trị:
- key: tên của property(ở đây là 'students')
- value: kiểu được ép về( ở đây là User)

Lúc này ta viết lại hàm convert ở trên thành:

```ts
import 'reflect-metadata';

export function convertObject<T>(outputType: {new(): T}, input: Object): T{
  if(input){
    const output = new outputType();
    const convertProperties = Reflect.getMetadataKeys(output);

    for(let key of Object.keys(input)){
      if(convertProperties.includes(key)){
        output[key] = convertList(Reflect.getMetadata(key, output), input[key]);

      } else{
        output[key] = convertObject(Reflect.getMeatadata(key, output), input[key]);
      }
    } else{
      output[key] = input[key]
    }
  }
  return output;
}
```

Hàm convert lúc này sẽ thực hiện theo các bước:

- tạo output thuộc kiểu định dạng sẽ được convert về.
- lấy danh sách các gặp (key, value) được lưu thông qua decorator phía trên.
- Kiểm tra với mỗi property của input đầu vào:
  - Nếu property này không nằm trong danh sách property cần convert, đơn giản là assign sang object mới.
  - Nếu có , thực hiện đệ quy việc convert cho property này ( Chú ý, Check nếu propery này thuộc dạng mảng, cần viết thêm 1 hàm riêng để convert kiểu cho Array để sử dụng 😛 )
-Trả về object.

Lúc này, output đầu ra của ta đã được ép kiểu ngay cả với các nested object, miễn là chúng được định nghĩa từ trong class.

```
//  ClassRoom { 
//    id: 12, 
//    name: 'IT 101', 
//    students: [
//      User: { id: 1, name: 'Blob' },     // => đối tượng thuộc kiểu User, không còn thuộc kiểu Object nữa :)
//      User: { id: 2, name: 'Angel' },
//      User: { id: 3, name: 'Mark' },
//    ]
//  }//  ClassRoom { 
//    id: 12, 
//    name: 'IT 101', 
//    students: [
//      User: { id: 1, name: 'Blob' },     // => đối tượng thuộc kiểu User, không còn thuộc kiểu Object nữa :)
//      User: { id: 2, name: 'Angel' },
//      User: { id: 3, name: 'Mark' },
//    ]
//  }
```

## Reference
[Ref](https://viblo.asia/p/typescript-decorator-va-metadata-reflection-m68Z0w2dKkG)