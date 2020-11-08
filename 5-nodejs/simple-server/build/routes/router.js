"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = express_1.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.send('Hi there');
});
router.get('/login', (req, res) => {
    res.send(`
    <form method="Post">
      <div>
        <label>Email</label>
        <input name="email" type="email">
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password">
      </div>
      <button>Submit</button>
    </form>
    `);
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    let result = 'Oh no, there are some problem!';
    if (email)
        result = email;
    if (password)
        result += password;
    res.send(result);
});
