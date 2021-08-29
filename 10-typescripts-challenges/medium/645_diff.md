<!--info-header-start--><h1>Diff <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23object-999" alt="#object"/></h1><blockquote><p>by ZYSzys <a href="https://github.com/ZYSzys" target="_blank">@ZYSzys</a></p></blockquote><p><a href="https://tsch.js.org/645/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Get an `Object` that is the difference between `O` & `O1`

- My solutions:
````ts
type Diff<T,U extends T> = Pick<T & U, Exclude<U, T>>

````

- Other solutions
````ts
type DiffObj<T,U> = Omit<T & U, keyof (T|U)>
type Diff<T,U> = {
    [K in keyof Diff<T,U>]: Diff<T,U>[K]
}
````

- Other solutions
````ts
type Merge<T> = {[K in keyof T]: T[K]}
type Diff<T,U> = Merge<
    | {
    [K in keyof Exclude<T, U>]: T[K]
} & {
    [K in keyof Exclude<U, T>]: U[K]
}
    >
````
<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/645/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/645/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->