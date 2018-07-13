import Koa from 'koa';
import cors from '@koa/cors';

import {
  ServerConfig,
} from '../types';

import { appendAPI } from './appendAPI';

export const makeApp = (config: ServerConfig) => {
  if (config.apis.length === 0) {
    throw Error('Server configuration should include more than 1 api');
  }

  const app = new Koa();
  app.use(cors());

  config.apis.map((api) => {
    appendAPI(app, api);
  });

  return app;
};
