import { API, APIKind, Headers, UnknownJSONType } from './types';

export const getValidatedPort = (port: UnknownJSONType): number => {
  if (typeof port !== 'number') {
    throw TypeError('port should be a number');
  }

  return port;
};

export const getValidatedHost = (host: UnknownJSONType): string => {
  if (typeof host !== 'string') {
    throw TypeError('host should be a string');
  }

  return host;
};

export const getValidatedAPIs = (apis: UnknownJSONType): Array<API> => {
  if (!Array.isArray(apis)) {
    throw TypeError('apis should be an array of apis');
  }

  if (apis.length < 1) {
    throw Error('Server configuration should include more than 1 api');
  }

  return apis.map((api, index) => {
    try {
      return getValidatedAPI(api);
    } catch (e) {
      if (e instanceof Error) {
        throw TypeError(`in apis[${index}], ${e.message}`);
      }

      throw TypeError(`apis[${index}] is invalid`);
    }
  });
};

export const getValidatedAPI = (api: UnknownJSONType): API => {
  if (typeof api !== 'object' ||
      api === null ||
      Array.isArray(api)) {
    throw TypeError('api should be an object');
  }

  if (typeof api.apiPath !== 'string') {
    throw TypeError('api.apiPath should be a string');
  }

  let headers: Headers | undefined;

  if (api.headers !== undefined) {
    try {
      headers = getValidatedHeaders(api.headers);
    } catch (e) {
      if (e instanceof Error) {
        throw TypeError(`if exists, api.${e.message}`);
      }

      throw TypeError('api.headers exists, but is invalid');
    }
  }

  if (typeof api.code === 'number' &&
      api.filePath === undefined &&
      api.body === undefined) {
    return {
      kind: APIKind.FAILING,
      apiPath: api.apiPath,
      headers,
      code: api.code,
    };
  }

  if (api.code === undefined &&
      typeof api.filePath === 'string' &&
      api.body === undefined) {
    return {
      kind: APIKind.SERVING,
      apiPath: api.apiPath,
      headers,
      filePath: api.filePath,
    };
  }

  if (api.code === undefined &&
      api.filePath === undefined) {
    if (typeof api.body === 'object') {
      return {
        kind: APIKind.BODY,
        apiPath: api.apiPath,
        headers,
        body: JSON.stringify(api.body),
      };
    } else if (typeof api.body === 'string') {
      return {
        kind: APIKind.BODY,
        apiPath: api.apiPath,
        headers,
        body: api.body,
      }
    }
  }

  throw TypeError('api should have valid payloads');
};

export const getValidatedHeaders = (headers: UnknownJSONType): Headers => {
  if (typeof headers !== 'object' ||
      headers === null ||
      Array.isArray(headers)) {
    throw TypeError('headers should be an object');
  }

  Object.keys(headers).forEach((key) => {
    if (typeof headers[key] !== 'string') {
      throw TypeError(`headers[${key}] should be a string`);
    }
  });

  return headers as any;
}
