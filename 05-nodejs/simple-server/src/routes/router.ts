import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('Not permitted');
}
const router = Router();

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(
      `
     <div>
     <p>Hi there</p>
     <a href="/logout">Logout</a>
     </div>
     `
    );
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req: RequestWithBody, res: Response) => {
  res.send(
    `
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
    `
  );
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email === 'tester@gmail.com' && password === '123') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send(
      `
      <div>
      <p>Invalid email or password</p>
      <a href="/login">Try LOGIN again</a>
      </div>
      `
    );
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route');
});

export { router };
