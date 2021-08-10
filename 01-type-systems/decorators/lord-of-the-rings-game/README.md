# A Practical Introduction to TypeScript Class Decorators

- [A Practical Introduction to TypeScript Class Decorators](#a-practical-introduction-to-typescript-class-decorators)
  - [What is a decorator?](#what-is-a-decorator)
  - [Which Decorators Are There?](#which-decorators-are-there)
  - [Class Decorator](#class-decorator)
    - [Game class](#game-class)
    - [Hobbit decorator](#hobbit-decorator)
    - [Elf decorator](#elf-decorator)
    - [Decorator factory](#decorator-factory)
    - [When Would You Use the Class Decorator?](#when-would-you-use-the-class-decorator)
  - [Properties Decorators](#properties-decorators)
    - [How To Create a Property Decorator](#how-to-create-a-property-decorator)
    - [Getter](#getter)
    - [Setter](#setter)
    - [defineProperty](#defineproperty)
    - [Errors](#errors)
      - [noImplicitThis](#noimplicitthis)
  - [Reference](#reference)

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

## Class Decorator

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

### Elf decorator

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


### Decorator factory

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


### When Would You Use the Class Decorator?

Well, I think it’s pretty simple. When you want to overwrite or add a bunch of properties/methods to a class, it can be a good idea to use the class Decorator.
What is the difference between Decorator and extending a class?

Maybe you’re thinking that you could also extend the Hobbit or Elf class at the PlayerCharacter class. Yes, that is also possible!

But the difference, when using a class Decorator instead of extending a class, is that when you extend a class, you will and can manipulate the data from the extended class most of the time.

In contrast to extending a class, the class Decorator will always be on top of the class. So you can’t manipulate the data from the Decorator inside your class.
So, if you use a class Decorator, know that you can cause some major side-effects you didn’t think of.

## Properties Decorators

### How To Create a Property Decorator

When you create a property decorator function, you need to have two arguments.

- `target`, which refers to the constructor or prototype of the class you’re using the decorator on.
- `key`, which refers to the class property you’re using the decorator on.
  
When using `target[key]`, you will get the value (of that instance of the class) inside the property. This is super useful!

The `Class decorator `function has no access to any property value. That’s why the class decorator is better for adding properties. It’s not so useful for modifying property values. It is possible but introduces side effects.

Let’s create our player name emoji decorator to add an emoji after the player’s name based on the player type:

```ts

function playerNameEmoji() {
    return function (target: any, key: string) {

        let val = target[key];

        const getEmoji = (type: string) => {
            let val: string = ''
            switch (type) {
                case 'hobbit':
                    val = '🧙‍♂️'
                    break;

                case 'elf':
                    val = '🧝'
                    break;

            }
            return val
        }

        const getter = ()  => {
            return `${val} ${getEmoji(this.type)}`;
        };
        const setter = (next: any) => {
            console.log('set: ', this)
            val = next;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });

    };
}
```


### Getter

The `getter` function is for getting the property value of the class where you used the property decorator.

Inside this function, we have access to the instance of the class. In the return statement, we return the val, which includes the value of that property. Next to that, we call the getEmoji(this.type), which gives us the correct emoji based on the player type.

If we tried to access this inside the getEmoji() function without passing the this variable, we would get an error. This is because we only have access to the instance of PlayerCharacter in the getter function.

### Setter

With the setter, we can change the value of the class property’s instance. In this case, I didn’t change it but added an emoji to it.

When we try to add the emoji there, which sounds very logical to me, we would get an error. This is because we don't have access to the whole instance of the class in the setter.


### defineProperty

Finally, we have an accessor descriptor `Object.defineProperty()` in the property decorator. This descriptor will describe how our property will behave inside a class.

Note: I highly recommend reading about this because it's very powerful.
Inside the descriptor, we have a getter and setter method. They will be executed when you want to get the value or change it. Next to that, we set the enumerable to true. 

This will make sure it's visible during the enumeration of the corresponding object.
According to MDN web docs, “An accessor descriptor is a property described by a getter-setter pair of functions.”


### Errors

I guess a lot of you gonna have some error’s down the road. (Like me 😉) Hopefully, these solutions gonna help you further.

#### noImplicitThis

It can happen that you get an error like this. Nathaniel May asked this question in the comments.

`'this' implicitly has type 'any' because it does not have a type annotation.`

A quick but dirty fix is setting `noImplicitThis` to false in the `tsConfig.json`.


The problem is potentially is, you are using a function inside one of your Class method and want to have a property of the Class .

The solution to this is using a Arrow function because they don’t have their own this . this in an Arrow function refers to its parent.


## Reference

[Ref: Class decorator](https://medium.com/better-programming/a-practical-introduction-to-typescript-class-decorators-afb996af0763)

[Ref: Propeties decorator](https://medium.com/better-programming/an-introduction-to-typescript-property-decorators-1c9db23b6ca1)