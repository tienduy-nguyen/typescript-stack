import { Router } from 'express';
import ThemeARouter from './ThemeA';
import ThemeBRouter from './ThemeB';

class AppRouter {
  private _router = Router();
  private _subRouterA = ThemeARouter;
  private _subRouterB = ThemeBRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use('/themea', this._subRouterA);
    this._router.use('/themeb', this._subRouterB);
  }
}

export = new AppRouter().router;
