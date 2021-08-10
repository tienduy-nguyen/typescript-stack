# Webpack & TypeScript

This is a setup step by step for webpack project with TypeScript.

## Installation

Make sure you have TypeScript installed on your machine.

- Init `tsconfig.json` file
  ```bash
  $ tsc --init
  ```

  And modify the `tsconfig.json` file by your need when compile `.ts` file to JavaScript

  Here, I modify only the `compile target` to `ES6`.

  ```json
  {
  "compilerOptions": {
    //...
    "target": "es6",
    //...
  }
  ```
- Init `package.json` file
  ```bash
  $ npm init -y
  $ npm i webpack webpack-cli ts-loader typescript -D
  
  ```

## First Setup webpack for project
- Create init project file to run server
  ```bash
  $ mkdir public src
  $ touch public/index.html 
  $ touch src/index.ts
  ```

  For this demo, we will create `index.html` with a simple information. ex:

  ```html
  <!-- public/index.html -->
   
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack & TypeScript</title>
  </head>
  <body>
    <h1>Signup for the latest tutorials</h1>
    <form>
      <label for="name">Your name</label>
      <input type="text" id="name" required>
      <label for="email">Your email</label>
      <input type="email" id="email" required>
      <label for="age">Your age</label>
      <input type="number" id="age" required>
      <button>submit</button>
    </form>

    <!-- add scripts here -->
  </body>
  </html>
  ```
- Create `webpack.config.js` file in the root of project
  ```js
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          include: [path.resolve(__dirname, 'src')],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
  };

  ```
- Write some content in `src/index.ts` file for testing
  For ex:

  ```ts
  console.log('webpack')
  ```
- Edit `script` in `package.json` file
  ```json
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack --watch --config webpack.config.js"
  },
  ```
- First build
  ```bash
  $ npm run build
  ```
  When you run this command, a file `bundle.js` will be built on the `public` folder.


## Run server webpack

- We will use `webpack-dev-server` package
  ```bash
  $ npm i webpack-dev-server -D
  ```
- Add `webpack-dev-server` to script of `package.json`
  ```json
  "scripts": {
      "serve": "webpack serve",
      "build": "webpack --config webpack.config.js",
      "dev": "webpack --watch --config webpack.config.js"
    },
  ```
## Update form
- Create `forms.ts` in `src` folder
  ```ts
  export const formData = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input');
  let values: { [prop: string]: string } = {};

    inputs.forEach((input) => {
      values[input.id] = input.value;
    });
    return values;
  };

  ```
- Update `index.ts` file
  ```ts
  import { formData } from './forms';

  const form = document.querySelector('form')!;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = formData(form);
    console.log(data);
  });

  ```
- Run build and test the result

## Using `sourceMap` to compile TypeScript

SourMap in TypeScript help us easier to debug the error
- To use that, set `sourceMap` to `true` in `tsconfig.json`
- Update dev-tool in `webpack.config.js`
  ```js
  // webpack.config.js
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: [path.resolve(__dirname, 'src')],
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devtool: 'eval-source-map',
    output: {
      publicPath: 'public',
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
  };

  ```