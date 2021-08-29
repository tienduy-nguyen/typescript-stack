<!--info-header-start--><h1>Percentage Parser <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> </h1><blockquote><p>by SSShuai1999 <a href="https://github.com/SSShuai1999" target="_blank">@SSShuai1999</a></p></blockquote><p><a href="https://tsch.js.org/1978/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement PercentageParser<T extends string>.
According to the `/^(\+|\-)?(\d*)?(\%)?$/` regularity to match T and get three matches.

The structure should be: [`plus or minus`, `number`, `unit`]
If it is not captured, the default is an empty string.

For example:
```ts
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1>  // expected ['', '', '']
type R2 = PercentageParser<PString2>  // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>  // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>  // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>  // expected ["", "85", ""]
```

- GitHub solutions
````ts
// https://github.com/type-challenges/type-challenges/issues/2421
type TrimStart<
  S extends string,
  Trimmed extends string
> = S extends `${Trimmed}${infer R}` ? R : "";

type TrimEnd<
  S extends string,
  Trimmed extends string
> = S extends `${infer R}${Trimmed}` ? R : "";

type GetNumberGreedy<S extends string> = S extends `${number}${infer Rest}`
  ? `${TrimEnd<S, Rest>}${GetNumberGreedy<Rest>}`
  : "";

type ParseNumber<S extends string> = S extends `${number}${string}`
  ? [GetNumberGreedy<S>, TrimStart<S, GetNumberGreedy<S>>]
  : ["", S];

type ParseSign<S extends string> = S extends `${infer Sign}${number}${string}`
  ? Sign extends `${number}`
    ? ["", ...ParseNumber<S>]
    : [Sign, ...ParseNumber<TrimStart<S, Sign>>]
  : [S, "", ""];

type PercentageParser<A extends string> = ParseSign<A>;
````

- Other github solutions
`````ts
// https://github.com/type-challenges/type-challenges/issues/2735
type Num = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Operation = '+' | '-'
type PercentageParser<T, U extends string[] = [], N = 0> = N extends 0
    ? T extends `${infer L}${infer R}`
        ? L extends Operation
            ? PercentageParser<R, [L], 1>
            : PercentageParser<T, [''], 1>
        : PercentageParser<T, ['', ''], 2>
    : N extends 1
        ? T extends `${infer L}${infer R}`
            ? L extends Num
                ? PercentageParser<R, [U[0], `${U[1] extends string ? U[1] : ''}${L}`], 1>
                : PercentageParser<T, [U[0], U[1] extends string ? U[1] : ''], 2>
            : PercentageParser<T, [U[0], U[1] extends string ? U[1] : ''], 2>
        : N extends 2
            ? T extends `${infer L}`
                ? L extends '%'
                    ? [U[0], U[1], '%']
                    : [U[0], U[1], '']
                : [U[0], U[1], '%']
            : never
`````

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/1978/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/1978/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->