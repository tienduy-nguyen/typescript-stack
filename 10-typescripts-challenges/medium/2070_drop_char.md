<!--info-header-start--><h1>Drop Char <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23template--literal-999" alt="#template-literal"/> <img src="https://img.shields.io/badge/-%23infer-999" alt="#infer"/></h1><blockquote><p>by CaptainOfPhB <a href="https://github.com/CaptainOfPhB" target="_blank">@CaptainOfPhB</a></p></blockquote><p><a href="https://tsch.js.org/2070/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Drop a specified char from a string.

For example:

```ts
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
```

- My solutions
````ts
export type DropChar<T extends string, Char extends string> =
T extends `${infer L}${Char}${infer R}`
? `${L}${DropChar<R, Char>}`
: T
````

- Others solutions
````ts
type EqualType<T, R> = [T] extends [R] ? ([R] extends [T] ? true : false) : false
type DropChar<
  S extends string,
  C extends string
> = S extends `${infer L}${infer R}`
  ? `${EqualType<L, C> extends true ? '' : L}${DropChar<R, C>}`
  : ''
````
<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/2070/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2070/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/master/questions/2059-hard-drop-string/README.md" target="_blank"><img src="https://img.shields.io/badge/-2059%E3%83%BBDrop%20String-de3d37" alt="2059・Drop String"/></a> <!--info-footer-end-->