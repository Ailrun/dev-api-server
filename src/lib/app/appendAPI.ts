import { isAbsolute, join } from 'path';
import { cwd } from 'process';

import Koa from 'koa';
import route from 'koa-route';
import send from 'koa-send';

import { exhaustiveChecker } from '../utilities';
import {
  API,
  APIKind,
  Headers,
} from '../types';

const setHeaders = (ctx: Koa.Context, headers?: Headers) => {
  if (headers !== undefined) {
    Object.keys(headers).forEach((key) => {
      ctx.set(key, headers[key]);
    });
  }
}

export const appendAPI = (server: Koa, api: API) => {
  switch (api.kind) {
    case APIKind.FAILING: {
      server.use(route.all(api.apiPath, (ctx) => {
        setHeaders(ctx, api.headers);
        ctx.status = api.code;
      }));
      break;
    }
    case APIKind.SERVING: {
      server.use(route.all(api.apiPath, (ctx) => {
        setHeaders(ctx, api.headers);
        const absoluteFilePath = isAbsolute(api.filePath) ?
          api.filePath :
          join(cwd(), api.filePath);
        return send(ctx, absoluteFilePath);
      }));
      break;
    }
    case APIKind.BODY: {
      server.use(route.all(api.apiPath, (ctx) => {
        setHeaders(ctx, api.headers);
        ctx.body = api.body;
      }));
      break;
    }
    default: {
      exhaustiveChecker(api, 'One or more apis do not have `api.kind` value');
    }
  }
}
