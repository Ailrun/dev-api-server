import { Context } from 'koa';

import { Headers } from '../types';

export const setHeaders = (ctx: Context, headers?: Headers) => {
  if (headers !== undefined) {
    Object.keys(headers).forEach((key) => {
      ctx.set(key, headers[key]);
    });
  }
}
