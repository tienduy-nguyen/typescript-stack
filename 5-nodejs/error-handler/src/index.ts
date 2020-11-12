import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import Router from './routers';
import { ErrorHandler } from './models/ErrorHandler';

dotenv.config();

const app: Application = express();

app.get('/', (req, res) => {
  res.send('Hi there!');
});
app.use('/api', Router);

// make server app handle any error
app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
