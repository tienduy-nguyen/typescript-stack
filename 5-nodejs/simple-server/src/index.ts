import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router } from './routes/router';

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

app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
