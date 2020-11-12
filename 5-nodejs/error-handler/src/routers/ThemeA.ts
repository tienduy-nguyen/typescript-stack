import { Request, Response, NextFunction, Router } from 'express';
import { ThemeAController } from '../controllers/ThemeA';

class ThemeARouter {
  private _router = Router();
  private _controller = new ThemeAController();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = this._controller.defaultMethod;
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });
  }
}

export = new ThemeARouter().router;
