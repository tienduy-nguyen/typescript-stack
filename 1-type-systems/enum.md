# Enums

- [Enums](#enums)
  - [General](#general)
  - [Number Enums and Numbers](#number-enums-and-numbers)
  - [Number Enums and String](#number-enums-and-string)
  - [Changing the number associated with a Number Enum](#changing-the-number-associated-with-a-number-enum)
  - [Number Enums as flags](#number-enums-as-flags)
  - [String Enums](#string-enums)
  - [Const Enums](#const-enums)
  - [Enum with static functions](#enum-with-static-functions)
  

## General
An `enum` is a way to organize a collection of related values. Many other programming languages (C/C#/Java) have an `enum` data type but JavaScript does not. However, TypeScript does. Here is an example definition of a TypeScript `enum`:

```ts
enum CardSuit{
  Clubs,
  Diamonds,
  Hearts,
  Spades
}

//Sample usage
let card = CardSuit.Clubs;

//Safety
card  = "not a member of card suit"; // Error: string is not assignable to type CardSuit
```
Theses enums values are `number` so I'll call them NumberEnums from hence forth.

## Number Enums and Numbers

TypeScript enums are number based. This means that numbers can be assigned to an instance of the enum, and so can anything else that is compatible with `number`.

```ts
enum Color {
    Red,
    Green,
    Blue
}
var col = Color.Red;
col = 0; // Effectively same as Color.Red
```

## Number Enums and String

Before we look further into enums let's look at the JavaScript that it generates, here is a sample TypeScript:

```ts
enum Tristate{
  False, 
  True,
  Unknown
}

```

Generate the following JavaScript:
```ts
var Tristate;
(function (Tristate) {
    Tristate[Tristate["False"] = 0] = "False";
    Tristate[Tristate["True"] = 1] = "True";
    Tristate[Tristate["Unknown"] = 2] = "Unknown";
})(Tristate || (Tristate = {}))
```


let's focus on the line Tristate[Tristate["False"] = 0] = "False";. Within it Tristate["False"] = 0 should be self explanatory, i.e. sets "False" member of Tristate variable to be 0. Note that in JavaScript the assignment operator returns the assigned value (in this case 0). Therefore the next thing executed by the JavaScript runtime is Tristate[0] = "False". This means that you can use the Tristate variable to convert a string version of the enum to a number or a number version of the enum to a string. This is demonstrated below:

```ts
enum Tristate {
    False,
    True,
    Unknown
}
console.log(Tristate[0]); // "False"
console.log(Tristate["False"]); // 0
console.log(Tristate[Tristate.False]); // "False" because `Tristate.False == 0`
```

## Changing the number associated with a Number Enum

By default enums are 0 based and then each subsequent value increments by 1 automatically. As an example consider the following:

```ts
enum Color {
    Red,     // 0
    Green,   // 1
    Blue     // 2
}
```

However, you can change the number associated with any enum member by assigning to it specifically. This is demonstrated below where we start at 3 and strat incrementing from there:

```ts
enum Color {
    DarkRed = 3,  // 3
    DarkGreen,    // 4
    DarkBlue      // 5
}

```
`TIP: I quite commonly initialize the first enum with = 1 as it allows me to do a safe truthy check on an enum value.`

## Number Enums as flags

One excellent use of enums is the ability to use enums as Flags. Flags allow you to check if a certain condition from a set of conditions is true. Consider the following example where we have a set of properties animals:

```ts
enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
    EatsFish       = 1 << 2,
    Endangered     = 1 << 3
}

```
Here we are using the left shift operator to move 1 around a certain level of bits to come up with bitwise disjoint numbers 0001, 0010, 0100 and 1000 (these are decimals 1,2,4,8 if you are curious). The bitwise operators | (or) / & (and) / ~ (not) are your best friends when working with flags and are demonstrated below:

```ts
enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
}
type Animal = {
    flags: AnimalFlags
}

function printAnimalAbilities(animal: Animal) {
    var animalFlags = animal.flags;
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws');
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly');
    }
    if (animalFlags == AnimalFlags.None) {
        console.log('nothing');
    }
}

let animal: Animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly
```
Here:
we used |= to add flags
a combination of &= and ~ to clear a flag
| to combine flags
Note: you can combine flags to create convenient shortcuts within the enum definition e.g. EndangeredFlyingClawedFishEating below:


```ts
enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
    EatsFish       = 1 << 2,
    Endangered     = 1 << 3,

    EndangeredFlyingClawedFishEating = HasClaws | CanFly | EatsFish | Endangered,
}
```

## String Enums

We've only looked at enums where the member values are numbers. You are actually allowed to have enum members with string values as well. e.g.


```ts
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}
```

These can be easier to deal with and debug as they provide meaningful / debuggable string values.
You can use these values to do simple string comparisons. e.g.

```ts
// Where `someStringFromBackend` will be '' | 'passport_visa' | 'passport' ... etc.
const value = someStringFromBackend as EvidenceTypeEnum; 

// Sample use in code
if (value === EvidenceTypeEnum.PASSPORT){
    console.log('You provided a passport');
    console.log(value); // `passport`
}
```

## Const Enums
If you have an enum definition like the following:

```ts
enum Tristate{
  False, 
  True,
  Unknown
}
const lie = Tristate.False;
```

## Enum with static functions

You can use the declaration `enum + namespace` merging to add static methods to an enum. The following demonstrates an example where addn a static member isBusinessDay to an enum Weekday:

```ts
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
namespace Weekday{
  export function isBusinessDay(day: Weekday){
    switch(day){
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default return true;
    }
  }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun)); // false
```
