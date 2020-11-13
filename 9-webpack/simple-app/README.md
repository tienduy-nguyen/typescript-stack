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
  $ npm i webpack webpack-cli ts-loader -D
  ```
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


## 