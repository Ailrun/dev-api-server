import Koa from 'koa';
import route from 'koa-route';

import { exhaustiveChecker } from '../utilities';
import { API, APIKind } from '../types';

import { appendServingAPI } from './appendServingAPI';
import { setHeaders } from './setHeaders';

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
      appendServingAPI(server, api);
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
