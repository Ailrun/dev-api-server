import { exists, readFile } from 'fs';
import { isAbsolute, join } from 'path';
import { cwd } from 'process';
import { promisify } from 'util';

import { APIKind, ServerConfig, UnknownJSONObjectType } from './types';
import { getValidatedAPIs, getValidatedHost, getValidatedPort } from './validators';

export const parseConfig = async (filePath: string): Promise<ServerConfig> => {
  const absoluteFilePath = isAbsolute(filePath) ?
    filePath :
    join(cwd(), filePath);
  const isExists = await promisify(exists)(absoluteFilePath);

  if (!isExists) {
    throw Error(`Cannot find config file "${absoluteFilePath}"`);
  }

  const file = await promisify(readFile)(absoluteFilePath, 'UTF-8');

  let fileContent: { [key: string]: any } = {};
  try {
    fileContent = JSON.parse(file);
  } catch (e) {
    throw e
  }

  return getValidatedConfig(getDefaultedConfig(fileContent));
};

const getValidatedConfig = (
  defaultedConfig: UnknownJSONObjectType,
): ServerConfig => {
  return {
    apis: getValidatedAPIs(defaultedConfig.apis),
    hostname: getValidatedHost(defaultedConfig.hostname),
    port: getValidatedPort(defaultedConfig.port),
  };
};

const getDefaultedConfig = (
  fileContent: UnknownJSONObjectType,
): UnknownJSONObjectType => ({
  apis: [{
    kind: APIKind.BODY,
    apiPath: '/',
    body: 'hello world',
  }],
  port: 3210,
  hostname: 'localhost',
  ...fileContent,
});
