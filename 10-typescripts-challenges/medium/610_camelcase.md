<!--info-header-start--><h1>CamelCase <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23template--literal-999" alt="#template-literal"/></h1><blockquote><p>by Johnson Chu <a href="https://github.com/johnsoncodehk" target="_blank">@johnsoncodehk</a></p></blockquote><p><a href="https://tsch.js.org/610/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

`for-bar-baz` -> `forBarBaz`

- My solutions:
````ts
type Capitalize<S extends string> = S extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : ''

type CamelCase<S extends string> = S extends `${infer L}-${infer R}`
    ? `${L}${CamelCase<Capitalize<R>>}`
    : S
````

- Other solutions:
````ts
type ConcatDash<S extends string> = `-${S}`
type CamelCase<S extends string> = S extends `${infer L}-${infer M}${infer R}`
  ? M extends '-'
    ? `${L}-${CamelCase<ConcatDash<R>>}`
    : M extends Uppercase<M>
    ? `${L}-${M}${CamelCase<R>}`
    : `${L}${Uppercase<M>}${CamelCase<R>}`
  : S
````
<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/610/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/610/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->