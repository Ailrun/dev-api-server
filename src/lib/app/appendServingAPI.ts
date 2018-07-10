import { isAbsolute, join } from 'path';
import { cwd } from 'process';

import Koa from 'koa';
import route from 'koa-route';
import send from 'koa-send';
import pathToRegexp, { Key, compile } from 'path-to-regexp';

import { ServingAPI } from '../types';

import { setHeaders } from './setHeaders';

export const appendServingAPI = (server: Koa, api: ServingAPI) => {
  server.use(route.all(api.apiPath, async (ctx) => {
    const absoluteFilePath = isAbsolute(api.filePath) ?
      api.filePath :
      join(cwd(), api.filePath);
    const keys: Array<Key> = [];
    const matches = pathToRegexp(api.apiPath, keys)
      .exec(ctx.path);

    if (matches === null) {
      return;
    }

    const data: object = keys.reduce((acc, key, index) => {
      return {
        ...acc,
        [key.name]: matches[index + 1],
      };
    }, {});
    const file = compile(absoluteFilePath)(data);
    setHeaders(ctx, api.headers);
    await send(ctx, file);
    return;
  }));
}
