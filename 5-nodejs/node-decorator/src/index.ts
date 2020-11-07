import 'reflect-metadata';
import express, { Request, Response, Application } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Meoooo!');
});

app.listen(3000, () => {
  console.log('App running on port 3000!');
});
