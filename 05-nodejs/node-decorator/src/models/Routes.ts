export type RequestMethod = 'get' | 'post' | 'delete' | 'options' | 'put';

export interface IRouteDefinition {
  //Path to out route
  path: string;

  //HTTP request method (get, post,..)
  requestMethod: RequestMethod;
  methodName: string;
}
