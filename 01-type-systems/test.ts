let foo: any = 123;
foo = "Hello";

// Later
foo.toPrecision(3); // Allowed as you typed it as `any`