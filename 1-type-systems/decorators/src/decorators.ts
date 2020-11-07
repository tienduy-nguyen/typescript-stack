class Boat {
  color: string = 'red';
  get formattedColor(): string {
    return `This boats  color is ${this.color}`;
  }
  // @testDecorator
  @logError('Something bad!')
  pilot(): void {
    throw new Error();
    console.log('swish');
  }
}

function testDecorator(target: any, key: string): void {
  console.log('Target:', target);
  console.log('Key:', key);
}

function logError(err: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const method = desc.value;
    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log('Error:', err);
      }
    };
  };
}

const boat = new Boat();
boat.pilot();
