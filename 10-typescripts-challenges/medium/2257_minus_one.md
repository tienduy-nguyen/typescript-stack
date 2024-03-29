<!--info-header-start--><h1>MinusOne <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23math-999" alt="#math"/></h1><blockquote><p>by Mustafo Faiz <a href="https://github.com/fayzzzm" target="_blank">@fayzzzm</a></p></blockquote><p><a href="https://tsch.js.org/2257/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a number (always positive) as a type. Your type should return the number decreased by one.

For example:

```ts
type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54
```

- Github solutions
````ts
// https://github.com/type-challenges/type-challenges/issues/2741
type Make10Array<T extends any[]> = [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T
]
type Make1Array<T, L extends any[] = []> = `${L['length']}` extends T
    ? L
    : Make1Array<T, [...L, 1]>
type AddEqualArrayLength<
    T extends string,
    L extends any[] = []
    > = T extends `${infer U}${infer R}`
    ? AddEqualArrayLength<R, [...Make10Array<L>, ...Make1Array<U>]>
    : L

type Pop<T extends any[]> = T extends [...infer F, number] ? F : never
type MinusOne<T extends number> = Pop<AddEqualArrayLength<`${T}`>>['length']
````
<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/2257/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2257/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->