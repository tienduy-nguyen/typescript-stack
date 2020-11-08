"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
const router = express_1.Router();
exports.router = router;
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
     <div>
     <p>Hi there</p>
     <a href="/logout">Logout</a>
     </div>
     `);
    }
    else {
        res.redirect('/login');
    }
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
    if (email === 'tester@gmail.com' && password === '123') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send(`
      <div>
      <p>Invalid email or password</p>
      <a href="/login">Try LOGIN again</a>
      </div>
      `);
    }
});
router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send('Welcome to protected route');
});
