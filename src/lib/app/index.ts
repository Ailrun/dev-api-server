import Koa from 'koa';

import {
  ServerConfig,
} from '../types';

import { appendAPI } from './appendAPI';

export const makeApp = (config: ServerConfig) => {
  if (config.apis.length === 0) {
    throw Error('Server configuration should include more than 1 api');
  }

  const server = new Koa();

  config.apis.map((api) => {
    appendAPI(server, api);
  });

  return server;
};
