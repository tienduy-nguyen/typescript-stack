import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const app: Application = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  })
);

app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
