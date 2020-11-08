import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hi there');
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
  let result: string = 'Oh no, there are some problem!';
  if (email) result = email;
  if (password) result += password;
  res.send(result);
});

export { router };
