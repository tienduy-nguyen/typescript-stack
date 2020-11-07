import { IRouteDefinition } from '../models/Routes';

export const Get = (path: string): MethodDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    // target -> Class, propertyKey-> methodName
    // To prevent any further validation simply set it to an empty array here
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    // Get the routes stored sor far, extends it by the new route and re-set the metadata.
    const routes: IRouteDefinition[] = Reflect.getMetadata(
      'routes',
      target.constructor
    );
    routes.push({
      requestMethod: 'get',
      path,
      methodName: propertyKey as string,
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};
