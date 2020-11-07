/**
 * Set prefix for a controlelr
 * @param {string} prefix
 * @return {ClassDecorator}
 * @contructor
 */

export const Controller = (prefix: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata('prefix', prefix, target);
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
};
