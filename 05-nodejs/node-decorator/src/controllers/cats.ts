import { Request, Response } from 'express';
import { Controller } from '../decorators/Controller';
import { Get } from '../decorators/HTTP';

interface ICatDetailRequest extends Request {
  params: {
    id: string;
  };
}

@Controller('/cats')
export class CatController {
  @Get('/')
  public index(req: Request, res: Response) {
    return res.json({
      description: 'List of cats',
      cats: [],
    });
  }
  @Get('/:id')
  public show(req: Request, res: Response) {
    return res.json({
      description: `You are looking at the profile of ${req.params.id} cat`,
      cat: {},
    });
  }
}
