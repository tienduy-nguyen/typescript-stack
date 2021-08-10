import { ErrorHandler } from '../models/ErrorHandler';

export class ThemeAController {
  defaultMethod(): ErrorHandler {
    throw new ErrorHandler(501, 'Not implemented method');
  }
}
