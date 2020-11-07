# A Practical Introduction to TypeScript Class Decorators

## What is a decorator?

What are Decorators? Well, think about the meaning of the word “decoration” and you are pretty close.

The TypeScript website describes it as:

`“A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.”`

I would describe it as “a special declaration to add extra features on an existing class declaration, method, accessor, property, or parameter.”


## Which Decorators Are There?

To describe what Decorators do in TypeScript, we need to dive deeper into each type. There are a few different types of decorators.

- Class Decorator (current post).
- Property Decorator (next post).
- Method Decorator (will come later).
- Accessor @ Decorator (will come later).
- Parameter Decorator (will come later).

### Class Decorator

Let's start with the class Decorator. To visualize that, we are going to build a piece of the Lord of the Rings game.

To play the game, we need a lot of characters. Some can be the character you play with, some are for the scene around it.

This is the class for a Character. It has an `armour`, `height`, `width`, `weight`, and type. The type is bound to the enum `CharacterType`

```ts
// Build character functionality for Lord of the Rings game
enum CharacterType{
  NONE =  'none',
  HOBBIT = 'hobbit',
  ELF = 'elf'
}

class Character{
  public armour: number = 100;
  public height: number = 0;
  public width: number = 0;
  public weight: number = 0;
  public type: CharacterType = CharacterType.None;
}
```

In the LOTR, you have a wide variety of characters. We are going to use the class Decorator to make two character types, the Hobbit and the Elf.

Both of the classes extend the `Character` class we defined on top because the Elf and Hobbit both have their own strengths, weaknesses, and capabilities.

### Game class

```ts
class Hobbit extends Character{
  public height: number = 1;
  public width: number = 2;
  public weight: number = 40;
  public tpe: CharacterType = CharacterType.HOBBIT;

  constructor(){
    super
  }
}

class Elf extends Character{
  public amour: number = 1000;
  public height: number = 100;
  public width: number = 20;
  public weight: number =  90;
  public type: CharacterType = CharacterType.ELF;

  contructor(){
    super();
  }
}
```

### Hobbit decorator

In the hobbit decorator, we override some properties that are specific if our player is a Hobbit. The same for the Elf.


A decorator is a function that returns a new contructor which extends the constructor of the class. In this constructor, we add or overwrite existing properties/methods to the classes we apply the decorator on.

Sadly enough, we can't get the information from the original constructor to use that information.

```ts
function hobbitDec<T extends {new(...args: any[]): {}}>(superClass: T){
  const hobbit = new Hobbit();
  const {width, height, weight, armour, type} = hobbit;
  return class extends superClass{
    width = with;
    height = height;
    weight = weight;
    armour = amour;
    type = type;
  }
}
```

When you want to add the decorator to a class, you define it as `@hobbitDec` above the class you want it to be applied to.

```ts
@hobbitDec
class PlayerCharacter{
  public name: string = 'lalala';
}
```

When you console log that in the browser, you should see the information combined with the information from the `PlayerCharacter`.

```ts
const player = new PlayerCharacter();

console.log('Player: ', player);

// Player
// {armour: 100, height: 1, name: 'lalala', type: 'hobbit', weight: 40, width: 2,}
```

## Elf decorator

If we want our player to be an Elf, we do the same thing as for the Hobbit.

```ts
type Constructor = new (...args: any[]) => {};
function elfDec<T extends Constructor>(superClass: T){
  const elf = new Elf();
  const {width, height, weight, armour, type} = elf;

  return class extends superClass{
    width = width;
    height = height;
    weight = weight;
    armour = armour;
    type = type;
  }
}

```

We apply the `@elfDec` on the `PlayerCharacter` class to add the player type information.

```ts
@elfDec
class PlayerCharacter{
  public name: string = 'Player name';
}
```

Log the information in the console and you see that the correct information is applied.

```ts
const player = new PlayerCharacter()

console.log('player: ', player)

// Player:
{
  armour: 1000
  height: 100
  name: "Player name"
  type: "elf"
  weight: 90
  width: 20
}
```


## Decorator factory

If you want to give your Decorator some options, conditionals, or other extra data, you need to use a Decorator factory.

A Decorator factory is a function that returns the expression that will be called by the Decorator. Let’s take the Hobbit Decorator, for example.

If we want to use that Decorator with an option, we add it like `@hobbitDecorator(true)`.

```ts
@hobbitDecorator(true)
class PlayerCharacter {
    public name: string = 'Player name';
}
```

If we try to get the data from the player to the console, we see that the condition attribute is added to the result.

```ts
const player = new PlayerCharacter()

console.log('player: ', player)

// Player:
{
  armour: 100,
  height: 1,
  name: "lalalal",
  type: "hobbit",
  weight: 40,
  width: 2,
  condition: true
}
```


## When Would You Use the Class Decorator?

Well, I think it’s pretty simple. When you want to overwrite or add a bunch of properties/methods to a class, it can be a good idea to use the class Decorator.
What is the difference between Decorator and extending a class?

Maybe you’re thinking that you could also extend the Hobbit or Elf class at the PlayerCharacter class. Yes, that is also possible!

But the difference, when using a class Decorator instead of extending a class, is that when you extend a class, you will and can manipulate the data from the extended class most of the time.

In contrast to extending a class, the class Decorator will always be on top of the class. So you can’t manipulate the data from the Decorator inside your class.
So, if you use a class Decorator, know that you can cause some major side-effects you didn’t think of.

## Reference

[Ref](https://medium.com/better-programming/a-practical-introduction-to-typescript-class-decorators-afb996af0763)