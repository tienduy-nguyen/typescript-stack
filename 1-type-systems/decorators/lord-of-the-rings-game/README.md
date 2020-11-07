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

## Reference

[Ref](https://medium.com/better-programming/a-practical-introduction-to-typescript-class-decorators-afb996af0763)