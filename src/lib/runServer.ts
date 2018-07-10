import { makeApp } from './app';
import { ServerConfig } from './types';

export const runServer = (config: ServerConfig) => {
  const app = makeApp(config);
  const server = app.listen(config.port, config.hostname, () => {
    console.log(`dev-api-server starts at ${config.hostname}:${config.port}`);
  });

  return () => new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
};
